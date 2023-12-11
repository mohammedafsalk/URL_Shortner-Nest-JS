import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup-dto';
import { lognInDto } from './dto/login-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto, @Res() res: Response) {
    try {
      const result = await this.authService.signUp(signUpDto);
      if (result) {
        res.json({ success: true });
      }
    } catch (error) {
      res.json({ success: false, error: error.message });
    }
  }

  @Post('login')
  async login(@Body() loginDto: lognInDto, @Res() res: Response) {
    try {
      const result = await this.authService.login(loginDto);
      res
        .cookie('token', result.token, { httpOnly: true })
        .json({ success: true });
    } catch (error) {
      res.json({ success: false, error: error.message });
    }
  }

  @Get('checkLogin')
  async checkLogin(@Req() request, @Res() res: Response) {
    try {
      const result = await this.authService.checkLogin(request);
      if (result) {
        res.json({ success: true, user: result, loggedIn: true });
      } else {
        res.json({ success: true, loggedIn: false });
      }
    } catch (error) {
      res.json({ success: false, loggedIn: false, user: null });
    }
  }

  @Get('logout')
  logout(@Res() res: Response) {
    try {
      res.clearCookie('token', { httpOnly: true }).json({ success: true });
    } catch (error) {
      res.json({ success: false, error: error.message });
    }
  }
}
