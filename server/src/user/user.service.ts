import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schema/user/user.schema';
import * as mongoose from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: mongoose.Model<User>,
  ) {}

  async getusers(): Promise<{ users?: User[]; message?: boolean | string}> {
    try {
      const users = await this.userModel.find();
      if (users && users.length > 0) {
        return {users};
      } else {
        return { message: 'No users found' };
      }
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Internal Server Error');
    }
  }
}
