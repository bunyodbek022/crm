import { IsString, IsNotEmpty, IsOptional, IsEnum, IsEmail } from 'class-validator';
import { StaffRole } from '@prisma/client';

export class CreateStaffDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsOptional()
  @IsString()
  photo?: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsEnum(StaffRole)
  @IsNotEmpty()
  role: StaffRole;

  @IsString()
  @IsNotEmpty()
  branchId: string;
}
