import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';


@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) { }
  
  async create(data: CreateCourseDto) {
  const course = await this.prisma.course.create({
    data: {
      name: data.name,
      price: data.price,
      level: data.level,
      durationMonth: data.durationMonth,
      durationHours: data.durationHours,
      branch: {
        connect: { id: data.branchId }  
      },
    },
  });

  return {
    success: true,
    data: course,
  };
}


  async findAll() {
    const courses = await this.prisma.course.findMany();
    return {
      success: true,
      data: courses,
    };
  }

  async findOne(id: string) {
    const course = await this.prisma.course.findUnique({ where: { id } });

    if (!course) throw new NotFoundException('course not found');

    return {
      success: true,
      data: course,
    };
  }

  async update(id: string, dto: UpdateCourseDto) {
    const course = await this.prisma.course.findUnique({ where: { id } });

    if (!course) throw new NotFoundException('course not found');

    const updatedCourse = await  this.prisma.course.update({
      where: { id },
      data: dto,
    });

    return {
      success: true,
      data : updatedCourse
    }
  }

  async remove(id: string) {
    const course = await this.prisma.course.findUnique({ where: { id } });

    if (!course) throw new NotFoundException('course not found');

    const deletedCourse = await this.prisma.course.delete({ where: { id } });

    return {
      success: true,
      message: 'course deleted successfully'
    }
  }
}
