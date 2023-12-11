import { IsEmail, IsString, isString } from 'class-validator';

export class lognInDto {
   // Decorator to ensure that the 'email' property is a valid email format
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString()
   // Decorator to ensure that the 'password' property is a valid string format
  password: string;
}
