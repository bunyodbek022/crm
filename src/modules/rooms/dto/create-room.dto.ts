import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { Status } from '@prisma/client';

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  capacity: string;

  @IsString()
  @IsNotEmpty()
  branchId: string;

  @IsOptional()
  @IsEnum(Status)
  status?: Status;
}
