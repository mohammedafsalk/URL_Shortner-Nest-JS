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
    // Inject the Mongoose Model for the User schema
    @InjectModel(User.name) private userModel: mongoose.Model<User>,

    // Inject the JWT Service provided by NestJS
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ message: string }> {
    // Validate the SignUpDto using class-validator and class-transformer
    const validatedDto = plainToClass(SignUpDto, signUpDto);

    const validationErrors = await validate(validatedDto, {
      skipMissingProperties: true,
    });

    // Check for email validation errors
    const emailErrors = validationErrors.filter(
      (error) => error.property === 'email',
    );

    if (emailErrors.length > 0) {
      throw new BadRequestException(emailErrors[0].constraints);
    }

    const { username, email, password } = signUpDto;

    // Check if the user with the given email already exists
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash the password and create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      username,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();
    return { message: 'User successfully created' };
  }

  async login(
    loginDto: lognInDto,
  ): Promise<{ user: User; token: string | any }> {
    // Validate the lognInDto using class-validator and class-transformer
    const validatedDto = plainToClass(lognInDto, loginDto);

    const validationErrors = await validate(validatedDto, {
      skipMissingProperties: true,
    });

    // Check for email validation errors
    const emailErrors = validationErrors.filter(
      (error) => error.property === 'email',
    );

    if (emailErrors.length > 0) {
      throw new BadRequestException(emailErrors[0].constraints);
    }
    const { email, password } = loginDto;

    // Find the user with the provided email
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if the provided password matches the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate a JWT token and return it along with the user information
    const token = this.jwtService.sign({
      id: user._id,
      email: user.email,
      name: user.name,
    });
    return { user, token };
  }

  async checkLogin(@Req() request): Promise<any> {
    const token: string = request.cookies['token'];

    if (!token) {
      throw new ForbiddenException('Token is required');
    }
    try {
      // Verify and decode the JWT token
      const decoded = this.jwtService.verify(token);

      // Find the user based on the decoded user ID and exclude the password field
      const user = await this.userModel
        .findOne({ _id: decoded.id })
        .select('-password');

      if (user) {
        return user;
      } else {
        return null;
      }
    } catch (err) {
      return false;
    }
  }
}
