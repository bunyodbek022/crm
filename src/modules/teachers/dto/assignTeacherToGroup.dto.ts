import { IsNotEmpty, IsString } from "class-validator";

export class AssignTeacherToGroupDto {

    @IsString()
    @IsNotEmpty()
    teacherId: string;
    
    @IsString()
    @IsNotEmpty()
    groupId: string;
    
    @IsString()
    @IsNotEmpty()
    branchId: string;
    
}
