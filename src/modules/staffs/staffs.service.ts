import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StaffsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateStaffDto) {
    const staff = await this.prisma.staff.create({
      data: {
        fullName: data.fullName,
        photo: data.photo,
        phone: data.phone,
        password: data.password,
        role: data.role,
        branchId: data.branchId,
      },
    });

    return {
      success: true,
      data: 'Staff created successfully',
    };
  }

  async findAll() {
    const staffs = await this.prisma.staff.findMany({
      select: {
        fullName: true,
        photo: true,
        phone: true,
        branchId: true,
      },
    });
    return {
      success: true,
      data: staffs,
    };
  }

  async findOne(id: string) {
    const staff = await this.prisma.staff.findUnique({
      where: { id },
      select: {
        fullName: true,
        photo: true,
        phone: true,
        branchId: true,
      },
    });

    if (!staff) throw new NotFoundException('staff not found');

    return {
      success: true,
      data: staff,
    };
  }

  async update(id: string, dto: UpdateStaffDto) {
    const staff = await this.prisma.staff.findUnique({
      where: { id },
      select: {
        fullName: true,
        photo: true,
        phone: true,
        branchId: true,
      },
    });

    if (!staff) throw new NotFoundException('staff not found');

    const updatedStaff = await this.prisma.staff.update({
      where: { id },
      data: dto,
      select: {
        fullName: true,
        photo: true,
        phone: true,
        branchId: true,
      },
    });

    return {
      success: true,
      data: updatedStaff,
    };
  }

  async remove(id: string) {
    const staff = await this.prisma.staff.findUnique({ where: { id } });

    if (!staff) throw new NotFoundException('staff not found');

    const deletedStaff = await this.prisma.staff.delete({ where: { id } });

    return {
      success: true,
      message: 'staff deleted successfully',
    };
  }
}
