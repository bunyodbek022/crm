import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { AuthService } from '../auth/auth.service';
import { AssignTeacherToGroupDto } from './dto/assignTeacherToGroup.dto';

@UseGuards(AuthGuard, RolesGuard)
@Controller('teacher')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService,
    private readonly authService: AuthService,
  ) {}

  @Roles('ADMIN', 'MANAGER', 'RECEPTION')
  @Post()
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teachersService.create(createTeacherDto);
  }

  @Roles('ADMIN', 'MANAGER', 'RECEPTION')
   @Post('assign-group')
  async assignGroup(@Body() dto: AssignTeacherToGroupDto) {
    return this.teachersService.createTeacherGroup(dto);
  }


  @Get('profile')
  async getDashboard(@Request() req) {
    return this.authService.getDashboard(req.user, 'teacher');
}
  

  @Roles('ADMIN', 'MANAGER', 'RECEPTION')
  @Get()
  findAll() {
    return this.teachersService.findAll();
  }

  @Roles('ADMIN', 'MANAGER', 'RECEPTION')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teachersService.findOne(id);
  }

  @Roles('ADMIN', 'MANAGER', 'RECEPTION')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teachersService.update(id, updateTeacherDto);
  }

  @Roles('ADMIN', 'MANAGER', 'RECEPTION')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teachersService.remove(id);
  }
}
