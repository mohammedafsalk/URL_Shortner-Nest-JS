import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { Response } from 'express';
import { UrlDto } from 'src/auth/dto/url-dto';
import { url } from 'inspector';

@Controller('user')
@UseGuards(JwtAuthGuard) //Used to authenticate and protect routes which require authorization
export class UserController {
  constructor(private userService: UserService) {}

  // Handle GET methods for getting users
  @Get('all')
  async getusers(@Res() res: Response): Promise<void> {
    try {
      const users = await this.userService.getusers();
      res.json({ success: true, users });
    } catch (error) {
      res.json({ success: false, error: error });
    }
  }

  // Handle POST methods for creating a new short url
  @Post('url')
  async urlSubmit(@Body() body: UrlDto, @Res() res: Response): Promise<void> {
    try {
      await this.userService.createUrl(body);
      res.json({ success: true });
    } catch (err) {
      res.json({ success: false });
    }
  }

  // Handle GET methods for getting all url created by the user
  @Get('allurls/:id')
  async viewUrls(
    @Param('id') userId: string,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const urls = await this.userService.viewUrls(userId);
      if (urls.length > 0) {
        res.json({ success: true, urls });
      } else {
        res.json({ success: true, message: 'No url added' });
      }
    } catch (error) {
      res.json({ success: false, error: error.message });
    }
  }

  // Handle GET methods for redirecting users to original url
  @Get('redirect/:id')
  async getRedirect(
    @Param('id') urlId: string,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const url = await this.userService.getRedirect(urlId);
      res.json({ success: true, url });
    } catch (error) {
      res.json({ success: false, error: error.message });
    }
  }
}
