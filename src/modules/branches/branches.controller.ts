import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { BranchesService } from './branches.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@UseGuards(AuthGuard, RolesGuard)
@Controller('branches')
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) { }
  
  @Roles('ADMIN')
  @Post()
  create(@Body() createBranchDto: CreateBranchDto) {
    return this.branchesService.create(createBranchDto);
  }

  @Roles('ADMIN')
  @Get()
  findAll() {
    return this.branchesService.findAll();
  }
  @Roles('ADMIN')
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.branchesService.findOne(id);
  }

  @Roles('ADMIN')
  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateBranchDto: UpdateBranchDto) {
    return this.branchesService.update(id, updateBranchDto);
  }

  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.branchesService.remove(id);
  }
}
