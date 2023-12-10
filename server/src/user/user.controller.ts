import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { Response } from 'express';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('all')
  async getusers(@Res() res: Response): Promise<void> {
    try {
      const users = await this.userService.getusers();
      res.json({ success: true, users });
    } catch (error) {
      res.json({ success: false, error: error });
    }
  }
}
