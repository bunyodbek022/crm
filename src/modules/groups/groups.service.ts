import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GroupsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateGroupDto) {
    const group = await this.prisma.group.create({
      data: {
        name: data.name,
        courseId: data.courseId,
        branchId: data.branchId,
        roomId: data.roomId,
        startedDate: new Date(data.startedDate),
        endDate: new Date(data.endDate),
      },
      include: {
        course: true,
        branch: true,
        room: true,
      },
    });

    return {
      success: true,
      data: group,
    };
  }

  async findAll() {
    const groups = await this.prisma.group.findMany();
    return {
      success: true,
      data: groups,
    };
  }

  async findOne(id: string) {
    const group = await this.prisma.group.findUnique({ where: { id } });

    if (!group) throw new NotFoundException('group not found');

    return {
      success: true,
      data: group,
    };
  }

  async update(id: string, dto: UpdateGroupDto) {
    const group = await this.prisma.group.findUnique({ where: { id } });

    if (!group) throw new NotFoundException('group not found');

    const updatedGroup = await  this.prisma.group.update({
      where: { id },
      data: dto,
    });

    return {
      success: true,
      data : updatedGroup
    }
  }

  async remove(id: string) {
    const group = await this.prisma.group.findUnique({ where: { id } });

    if (!group) throw new NotFoundException('group not found');

    const deletedGroup = await this.prisma.group.delete({ where: { id }, });

    return {
      success: true,
      message: 'group deleted successfully'
    }
  }
}
