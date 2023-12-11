import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup-dto';
import { lognInDto } from './dto/login-dto';

@Controller('auth')
export class AuthController {
  // Injecting the AuthService into the controller
  constructor(private authService: AuthService) {}

  // Handling the POST request for user signup
  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto, @Res() res: Response) {
    try {
      // Calling the signUp method from the injected AuthService
      const result = await this.authService.signUp(signUpDto);

      // If the signup is successful, respond with success
      if (result) {
        res.json({ success: true });
      }
    } catch (error) {
      // If there's an error during signup, respond with an error message
      res.json({ success: false, error: error.message });
    }
  }

  // Handling the POST request for user login
  @Post('login')
  async login(@Body() loginDto: lognInDto, @Res() res: Response) {
    try {
      // Calling the login method from the injected AuthService
      const result = await this.authService.login(loginDto);

      // If login is successful, set a cookie with the JWT token and respond with success
      res
        .cookie('token', result.token, { httpOnly: true })
        .json({ success: true });
    } catch (error) {
      // If there's an error during login, respond with an error message
      res.json({ success: false, error: error.message });
    }
  }

  // Handling the GET request for user verifiying
  @Get('checkLogin')
  async checkLogin(@Req() request, @Res() res: Response) {
    try {
      // Calling the checkLogin method from the injected AuthService
      const result = await this.authService.checkLogin(request);

      // If the checkLogin is successful, respond with user details and loggedIn status
      if (result) {
        res.json({ success: true, user: result, loggedIn: true });
      } else {
        // If checkLogin fails (e.g., no valid token), respond with loggedIn as false
        res.json({ success: true, loggedIn: false });
      }
    } catch (error) {
      // If there's an error during signup, respond with an error message
      res.json({ success: false, loggedIn: false, user: null });
    }
  }

  // Handling the GET request for user logout
  @Get('logout')
  logout(@Res() res: Response) {
    try {
      res.clearCookie('token', { httpOnly: true }).json({ success: true });
    } catch (error) {
      res.json({ success: false, error: error.message });
    }
  }
}
