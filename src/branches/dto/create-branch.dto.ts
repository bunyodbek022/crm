import { IsDateString, IsOptional, IsString } from "class-validator"


export class CreateBranchDto {
    @IsString()
    name : string
    
    @IsString()
    logo: string
    
    @IsString()
    address: string
}
