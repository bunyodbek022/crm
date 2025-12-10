import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { loginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async loginStudent(data: loginUserDto) {
    try {
      const studentExist = await this.prisma.student.findUnique({
        where: { email: data.email },
      });
      if (!studentExist) {
        throw new NotFoundException('Student not found');
      }
      const isMatch = await bcrypt.compare(
        data.password,
        studentExist.password,
      );
      if (!isMatch)
        throw new BadRequestException('email or password incorrect');
      const token = this.jwtService.sign({
        id: studentExist.id,
        phone: studentExist.phone,
        email: studentExist.email,
      });

      return {
        success: true,
        message: 'Student sign in successfully',
        token,
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async loginStaff(data: loginUserDto) {
    try {
      const staffExist = await this.prisma.staff.findUnique({
        where: { email: data.email },
      });
      if (!staffExist) {
        throw new NotFoundException('staff not found');
      }
      const isMatch = await bcrypt.compare(data.password, staffExist.password);
      if (!isMatch)
        throw new BadRequestException('email or password incorrect');
      const token = this.jwtService.sign({
        id: staffExist.id,
        phone: staffExist.phone,
        email: staffExist.email,
        roles: staffExist.role,
      });

      return {
        token,
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async loginTeacher(data: loginUserDto) {
    try {
      const teacherExist = await this.prisma.teacher.findUnique({
        where: { email: data.email },
      });
      if (!teacherExist) {
        throw new NotFoundException('teacher not found');
      }
      const isMatch = await bcrypt.compare(
        data.password,
        teacherExist.password,
      );
      if (!isMatch)
        throw new BadRequestException('email or password incorrect');
      const token = this.jwtService.sign({
        id: teacherExist.id,
        phone: teacherExist.phone,
        email: teacherExist.email,
      });

      return {
        token,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async getDashboard(userFromToken, tableName : string) {
    if (userFromToken.roles && tableName == 'staff') {
      return await this.prisma.staff.findUnique({
        where: { id: userFromToken.id },
        select: {
          fullName: true,
          photo: true,
          email: true,
          phone: true,
          status: true,
          role: true,
          branchId: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    }
    const student = await this.prisma.student.findUnique({
      where: { id: userFromToken.id },
      select: {
        fullName: true,
        photo: true,
        email: true,
        phone: true,
        status: true,
        branchId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    const teacher = await this.prisma.teacher.findUnique({
      where: { id: userFromToken.id },
      select: {
        fullName: true,
        photo: true,
        status: true,
        email: true,
        phone: true,
        profession: true,
        branchId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (student  && tableName == 'student') {
      return {
        success: true,
        data: student,
      };
    }
    if (teacher && tableName == 'teacher') {
      return {
        success: true,
        data: teacher,
      };
    }

    throw new NotFoundException('User not found');
  }
}
