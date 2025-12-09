import { IsString, IsNotEmpty, IsOptional, IsArray, IsEmail } from 'class-validator';

export class CreateTeacherDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsOptional()
  @IsString()
  photo?: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsArray()
  @IsNotEmpty()
  profession: string[];

  @IsString()
  @IsNotEmpty()
  branchId: string;
}
