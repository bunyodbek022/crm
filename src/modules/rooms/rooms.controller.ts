import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@UseGuards(AuthGuard, RolesGuard)
@Controller('room')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Roles('ADMIN', 'MANAGER', 'RECEPTION')
  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @Roles('ADMIN', 'MANAGER', 'RECEPTION')
  @Get()
  findAll() {
    return this.roomsService.findAll();
  }

  @Roles('ADMIN', 'MANAGER', 'RECEPTION')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(id);
  }

  @Roles('ADMIN', 'MANAGER', 'RECEPTION')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(id, updateRoomDto);
  }

  @Roles('ADMIN', 'MANAGER', 'RECEPTION')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomsService.remove(id);
  }
}
