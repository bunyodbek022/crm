import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';

export class CreateTeacherDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsOptional()
  @IsString()
  photo?: string;

  @IsString()
  @IsNotEmpty()
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
