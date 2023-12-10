import { IsEmail, IsString, isString } from 'class-validator';

export class lognInDto {
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString()
  password: string;
}
