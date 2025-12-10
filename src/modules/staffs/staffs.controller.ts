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
import { StaffsService } from './staffs.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

import { AuthService } from '../auth/auth.service';

@UseGuards(AuthGuard, RolesGuard)
@Controller('staff')
export class StaffsController {
  constructor(
    private readonly staffsService: StaffsService,
    private readonly authService: AuthService,
  ) { }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getDashboard(@Request() req) {
    return this.authService.getDashboard(req.user, 'staff');
  }

  @Roles('ADMIN', 'MANAGER')
  @Post()
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffsService.create(createStaffDto);
  }

  @Roles('ADMIN', 'MANAGER', 'RECEPTION')
  @Get()
  findAll() {
    return this.staffsService.findAll();
  }

  @Roles('ADMIN', 'MANAGER', 'RECEPTION')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staffsService.findOne(id);
  }

  @Roles('ADMIN', 'MANAGER', 'RECEPTION')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffsService.update(id, updateStaffDto);
  }

  @Roles('ADMIN', 'MANAGER')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staffsService.remove(id);
  }

}
