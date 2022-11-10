import { IsEmail, IsString } from 'class-validator';

export class SignInUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
