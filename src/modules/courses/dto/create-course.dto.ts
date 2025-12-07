import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateCourseDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  level: number;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  durationMonth: number;

  @IsNumber()
  @Min(0) 
  @IsNotEmpty()
  durationHours: number;

  @IsUUID()
  @IsNotEmpty()
  branchID: string;
}
