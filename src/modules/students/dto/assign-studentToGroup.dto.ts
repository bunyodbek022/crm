import { IsNotEmpty, IsString } from "class-validator";

export class AssignStudentToGroupDto {

    @IsString()
    @IsNotEmpty()
    studentId: string;
    
    @IsString()
    @IsNotEmpty()
    groupId: string;
    
    @IsString()
    @IsNotEmpty()
    branchId: string;
    
}
