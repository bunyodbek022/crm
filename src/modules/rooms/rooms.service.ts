import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoomsService {
  constructor(private readonly prisma: PrismaService) { }
    
    async create(data: CreateRoomDto) {
    const room = await this.prisma.room.create({
      data: {
        name: data.name,
        capacity: data.capacity,
        branchId: data.branchId,     
      },
    });
  
    return {
      success: true,
      data: room,
    };
  }
  
  
    async findAll() {
      const rooms = await this.prisma.room.findMany();
      return {
        success: true,
        data: rooms,
      };
    }
  
    async findOne(id: string) {
      const room = await this.prisma.room.findUnique({ where: { id } });
  
      if (!room) throw new NotFoundException('room not found');
  
      return {
        success: true,
        data: room,
      };
    }
  
    async update(id: string, dto: UpdateRoomDto) {
      const room = await this.prisma.room.findUnique({ where: { id } });
  
      if (!room) throw new NotFoundException('room not found');
  
      const updatedRoom = await  this.prisma.room.update({
        where: { id },
        data: dto,
      });
  
      return {
        success: true,
        data : updatedRoom
      }
    }
  
    async remove(id: string) {
      const room = await this.prisma.room.findUnique({ where: { id } });
  
      if (!room) throw new NotFoundException('room not found');
  
      const deletedRoom = await this.prisma.room.delete({ where: { id } });
  
      return {
        success: true,
        message: 'room deleted successfully'
      }
    }
}
