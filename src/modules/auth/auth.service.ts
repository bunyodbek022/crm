import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { loginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async loginStudent(data: loginUserDto, res: Response) {
    try {
      const studentExist = await this.prisma.student.findUnique({
        where: { phone: data.phone },
      });
      if (!studentExist) {
        throw new NotFoundException('Student not found');
      }
      const token = this.jwtService.sign({
        id: studentExist.id,
        phone: studentExist.phone,
        email: studentExist.email,
      });

      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
