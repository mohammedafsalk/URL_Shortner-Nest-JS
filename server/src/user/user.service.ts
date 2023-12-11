import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schema/user/user.schema';
import * as mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Url } from 'src/schema/url/url.schema';
import { UrlDto } from 'src/auth/dto/url-dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: mongoose.Model<User>,
    @InjectModel(Url.name) private urlModel: mongoose.Model<Url>,
  ) {}

  async getusers(): Promise<{ users?: User[]; message?: boolean | string }> {
    try {
      const users = await this.userModel.find();
      if (users && users.length > 0) {
        return { users };
      } else {
        return { message: 'No users found' };
      }
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async createUrl(urldto: UrlDto): Promise<void> {
    const { title, shortUrl, userId } = urldto;
    const longUrl = `http://localhost:3000//${uuidv4()}`;
    const newUrl = new this.urlModel({ title, shortUrl, longUrl, userId });
    try {
      await newUrl.save();
    } catch (error) {
      throw new NotFoundException('Failed to create');
    }
  }

  async viewUrls(userId: string): Promise<any> {
    try {
      const urls = await this.urlModel
        .find({ userId })
        .sort({ _id: -1 })
        .populate('userId')
        .lean();
      return urls;
    } catch (error) {
      throw new NotFoundException('Failed to fetch data');
    }
  }

  async getRedirect(urlId: string): Promise<any> {
    try {
      const longUrl = `http://localhost:3000//${urlId}`;    
      const redirectUrl = await this.urlModel.findOne({ longUrl });
      return redirectUrl;
    } catch (error) {
      throw new NotFoundException('Failed to fetch data');
    }
  }
}
