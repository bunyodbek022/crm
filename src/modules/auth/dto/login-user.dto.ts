import { IsNotEmpty, IsString } from 'class-validator';

export class loginUserDto {
  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
