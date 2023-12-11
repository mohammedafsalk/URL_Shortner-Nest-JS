import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/schema/user/user.schema';
import { SignUpDto } from './dto/signup-dto';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { JwtService } from '@nestjs/jwt';
import { lognInDto } from './dto/login-dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: mongoose.Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ message: string }> {
    const validatedDto = plainToClass(SignUpDto, signUpDto);

    const validationErrors = await validate(validatedDto, {
      skipMissingProperties: true,
    });
    const emailErrors = validationErrors.filter(
      (error) => error.property === 'email',
    );

    if (emailErrors.length > 0) {
      throw new BadRequestException(emailErrors[0].constraints);
    }
    const { username, email, password } = signUpDto;
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return { message: 'User successfully created' };
  }

  async login(loginDto: lognInDto): Promise<{ user: User; token: string|any }> {
    const validatedDto = plainToClass(lognInDto, loginDto);

    const validationErrors = await validate(validatedDto, {
      skipMissingProperties: true,
    });
    const emailErrors = validationErrors.filter(
      (error) => error.property === 'email',
    );

    if (emailErrors.length > 0) {
      throw new BadRequestException(emailErrors[0].constraints);
    }
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = this.jwtService.sign ({
      id: user._id,
      email: user.email,
      name: user.name,
    });
    return { user,token };
  }

  async checkLogin(@Req() request): Promise<boolean> {
    let loggedIn: boolean;
    const token: string = request.cookies['token'];

    if (!token) {
      throw new ForbiddenException('Token is required');
    }
    try {
      const decoded = this.jwtService.verify(token);
      console.log(decoded);
      
      const user = await this.userModel.findOne({ _id: decoded.id });
      if (user) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }
}
