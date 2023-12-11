import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AllExceptionsFilter } from './filters/unauthorized-exception.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ], // Provide the global exception filter for handling all exceptions
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }), // Configure the application with environment variables
    MongooseModule.forRoot(process.env.DB), // Connect to the MongoDB database using Mongoose
  ],
})
export class AppModule {}
