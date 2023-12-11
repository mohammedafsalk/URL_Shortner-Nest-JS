import { IsEmail, IsString } from 'class-validator';

export class SignUpDto {
   // Decorator to ensure that the 'username' property is a valid string format
   @IsString()
   username: string;
   
   // Decorator to ensure that the 'email' property is a valid email format
   @IsEmail({}, { message: 'Invalid email format' })
   email: string;
   
   // Decorator to ensure that the 'password' property is a valid string format
   @IsString()
  password: string;
}
