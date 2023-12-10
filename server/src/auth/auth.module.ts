import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schema/user/user.schema';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports:[ MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),] 
})
export class AuthModule {}
