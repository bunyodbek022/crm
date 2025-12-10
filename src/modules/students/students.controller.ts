import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthService } from '../auth/auth.service';
import { AssignStudentToGroupDto } from './dto/assign-studentToGroup.dto';

@UseGuards(AuthGuard, RolesGuard)
@Controller('student')
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly authService: AuthService,
  ) {}

  @Roles('ADMIN', 'MANAGER', 'RECEPTION')
  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Roles('ADMIN', 'MANAGER', 'RECEPTION')
  @Post('assign-group')
  async assignGroup(@Body() dto: AssignStudentToGroupDto) {
    return this.studentsService.createStudentGroup(dto);
  }



  @Get('profile')
  async getDashboard(@Request() req) {
    return this.authService.getDashboard(req.user, 'student');
  }

  @Roles('ADMIN', 'MANAGER', 'RECEPTION')
  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @Roles('ADMIN', 'MANAGER', 'RECEPTION')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }

  @Roles('ADMIN', 'MANAGER', 'RECEPTION')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(id, updateStudentDto);
  }

  @Roles('ADMIN', 'MANAGER', 'RECEPTION')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(id);
  }
}
