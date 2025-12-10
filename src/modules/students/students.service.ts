import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/common/mailer/mailer.service';
import { AssignStudentToGroupDto } from './dto/assign-studentToGroup.dto';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService, private sendPassword : MailService) {}

  async create(data: CreateStudentDto) {
    const existEmail = await this.prisma.student.findUnique({ where: { email: data.email } });

    if (existEmail) throw new BadRequestException("Email aready exist");

    const existPhone = await this.prisma.student.findUnique({ where: { phone: data.phone } });

    if (existPhone) throw new BadRequestException("Phone aready exist");

    await this.sendPassword.sendMail(data.email, 'Your password', data.password)
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const student = await this.prisma.student.create({
      data: {
        fullName: data.fullName,
        photo: data.photo,
        email: data.email,
        phone: data.phone,
        password: hashedPassword,
        branchId: data.branchId,
      },
    });
    return {
      success: true,
      data: 'Student created successfully',
    };
  }

  async findAll() {
    const students = await this.prisma.student.findMany({
      select: {
        id: true,
        fullName: true,
        photo: true,
        email: true,
        phone: true,
        branchId: true,
      },
    });
    return {
      success: true,
      data: students,
    };
  }

  async findOne(id: string) {
    const student = await this.prisma.student.findUnique({
      where: { id },
      select: {
        fullName: true,
        photo: true,
        email: true,
        phone: true,
        branchId: true,
      },
    });

    if (!student) throw new NotFoundException('student not found');

    return {
      success: true,
      data: student,
    };
  }

  async update(id: string, dto: UpdateStudentDto) {
    const student = await this.prisma.student.findUnique({ where: { id } });

    if (!student) throw new NotFoundException('student not found');

    const updatedStudent = await this.prisma.student.update({
      where: { id },
      data: dto,
      select: {
        fullName: true,
        photo: true,
        email: true,
        phone: true,
        branchId: true
      }
    });

    return {
      success: true,
      data: updatedStudent,
    };
  }

  async remove(id: string) {
    const student = await this.prisma.student.findUnique({ where: { id } });

    if (!student) throw new NotFoundException('student not found');

    const deletedStudent = await this.prisma.student.delete({ where: { id } });

    return {
      success: true,
      message: 'student deleted successfully',
    };
  }

  async createStudentGroup(data: AssignStudentToGroupDto) {
      try {
        const exists = await this.prisma.studentsGroup.findUnique({
          where: {
            studentId_groupId: {
              studentId: data.studentId,
              groupId: data.groupId,
            },
          },
        });
  
        if (exists) {
          throw new BadRequestException(
            'This student already assigned this group',
          );
        }
  
        const result = await this.prisma.studentsGroup.create({
          data: {
            studentId: data.studentId,
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
          'There is a problem with createStudentGroup',
        );
      }
    }
  
}
