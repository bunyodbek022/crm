import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class loginUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
