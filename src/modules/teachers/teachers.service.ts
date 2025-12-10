import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailService } from 'src/common/mailer/mailer.service';
import * as bcrypt from 'bcrypt';
import { AssignTeacherToGroupDto } from './dto/assignTeacherToGroup.dto';

@Injectable()
export class TeachersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sendPassword: MailService,
  ) {}

  async create(data: CreateTeacherDto) {
    const existEmail = await this.prisma.teacher.findUnique({
      where: { email: data.email },
    });

    if (existEmail) throw new BadRequestException('Email aready exist');

    const existPhone = await this.prisma.teacher.findUnique({
      where: { phone: data.phone },
    });

    if (existPhone) throw new BadRequestException('Phone aready exist');
    await this.sendPassword.sendMail(
      data.email,
      'Your password',
      data.password,
    );
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const teacher = await this.prisma.teacher.create({
      data: {
        fullName: data.fullName,
        photo: data.photo,
        email: data.email,
        phone: data.phone,
        password: hashedPassword,
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
        id: true,
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
        teacherGroups: {
          select: {
            group: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

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

  async createTeacherGroup(data: AssignTeacherToGroupDto) {
    try {
      const exists = await this.prisma.teacherGroup.findUnique({
        where: {
          teacherId_groupId: {
            teacherId: data.teacherId,
            groupId: data.groupId,
          },
        },
      });

      if (exists) {
        throw new BadRequestException(
          'This teacher already assigned this group',
        );
      }

      const result = await this.prisma.teacherGroup.create({
        data: {
          teacherId: data.teacherId,
          groupId: data.groupId,
          branchId: data.branchId,
        },
      });
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'There is a problem with createTeacherGroup',
      );
    }
  }
}
