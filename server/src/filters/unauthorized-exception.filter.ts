import {
  Catch,
  ExceptionFilter,
  HttpStatus,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch() // Decorator for catching exceptions of any type
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    // Determine the HTTP status code based on the type of exception
    const status =
      exception instanceof HttpException
        ? exception.getStatus() // If it's an HttpException, use its status
        : HttpStatus.INTERNAL_SERVER_ERROR; // Otherwise, default to Internal Server Error

    // Send a JSON response with the appropriate status code and error message
    response.status(status).json({
      success: false,
      message: exception.message || 'Internal Server Error',
    });
  }
}
