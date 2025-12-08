import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class BranchesService {
  constructor(private readonly prisma: PrismaService) { }
  
  async create(data: CreateBranchDto) {
    const branch = await this.prisma.branch.create({ data });
    return {
      success: true,
      data: branch,
    };
  }

  async findAll() {
    const branches = await this.prisma.branch.findMany();
    return {
      success: true,
      data: branches,
    };
  }

  async findOne(id: string) {
    const branch = await this.prisma.branch.findUnique({ where: { id } });

    if (!branch) throw new NotFoundException('branch not found');

    return {
      success: true,
      data: branch,
    };
  }

  async update(id: string, dto: UpdateBranchDto) {
    const branch = await this.prisma.branch.findUnique({ where: { id } });

    if (!branch) throw new NotFoundException('branch not found');

    const updatedBranch = await  this.prisma.branch.update({
      where: { id },
      data: dto,
    });

    return {
      success: true,
      data : updatedBranch
    }
  }

  async remove(id: string) {
    const branch = await this.prisma.branch.findUnique({ where: { id } });

    if (!branch) throw new NotFoundException('branch not found');

    const deletedBranch = await this.prisma.branch.delete({ where: { id } });

    return {
      success: true,
      message: 'Branch deleted successfully'
    }
  }
}
