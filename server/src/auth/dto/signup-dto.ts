import { IsEmail, IsString } from 'class-validator';

export class SignUpDto {
  @IsString()
  username: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString()
  password: string;
}
