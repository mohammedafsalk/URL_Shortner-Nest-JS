import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable() // Injectable decorator marks this class as a provider that can be injected into other components
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {} // Injecting the JwtService for JWT token operations
  canActivate(context: ExecutionContext): boolean {
    // Extracting the request object from the execution context
    const request = context.switchToHttp().getRequest();

    // Extracting the JWT token from the 'token' cookie in the request
    const token = request.cookies['token'];

    // If there's no token, throw an UnauthorizedException indicating access denied
    if (!token) {
      throw new UnauthorizedException('Access denied');
    }
    try {
      // Verify the JWT token using the JwtService
      const decoded: any = this.jwtService.verify(token);
      // Attach the decoded user information to the request for further use in the application
      request.user = decoded;
      // If the token is valid, allow access by returning true
      return true;
    } catch (err) {
      // If an error occurs during token verification, throw an UnauthorizedException
      throw new UnauthorizedException('Access denied');
    }
  }
}
