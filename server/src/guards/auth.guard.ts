

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies['token'];

    if (!token) {
      return false;
    }

    try {
      const decoded: any = this.jwtService.verify(token);
      request.user = decoded;
      return true;
    } catch (err) {
      return false;
    }
  }
}
