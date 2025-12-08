import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TeachersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateTeacherDto) {
    const teacher = await this.prisma.teacher.create({
      data: {
        fullName: data.fullName,
        photo: data.photo,
        email: data.email,
        phone: data.phone,
        password: data.password,
        profession: data.profession,
        branchId: data.branchId,
      },
    });

    return {
      success: true,
      message: 'Teacher created successfully',
    };
  }

  async findAll() {
    const teachers = await this.prisma.teacher.findMany({
      select: {
        fullName: true,
        photo: true,
        email: true,
        phone: true,
        profession: true,
        branchId: true,
      },
    });
    return {
      success: true,
      data: teachers,
    };
  }

  async findOne(id: string) {
    const teacher = await this.prisma.teacher.findUnique({
      where: { id },
    select: {
        fullName: true,
        photo: true,
        email: true,
        phone: true,
        profession: true,
        branchId: true,
      }});

    if (!teacher) throw new NotFoundException('teacher not found');

    return {
      success: true,
      data: teacher,
    };
  }

  async update(id: string, dto: UpdateTeacherDto) {
    const teacher = await this.prisma.teacher.findUnique({ where: { id } });

    if (!teacher) throw new NotFoundException('teacher not found');

    const updatedTeacher = await this.prisma.teacher.update({
      where: { id },
      data: dto,
      select: {
        fullName: true,
        photo: true,
        email: true,
        phone: true,
        profession: true,
        branchId: true,
      },
    });

    return {
      success: true,
      data: updatedTeacher,
    };
  }

  async remove(id: string) {
    const teacher = await this.prisma.teacher.findUnique({ where: { id } });

    if (!teacher) throw new NotFoundException('teacher not found');

    const deletedTeacher = await this.prisma.teacher.delete({ where: { id } });

    return {
      success: true,
      message: 'teacher deleted successfully',
    };
  }
}
