import { Module } from '@nestjs/common';
import { StaffsService } from './staffs.service';
import { StaffsController } from './staffs.controller';
import { AuthService } from '../auth/auth.service';

@Module({
  controllers: [StaffsController],
  providers: [StaffsService, AuthService],
})
export class StaffsModule {}
