import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BranchesModule } from './branches/branches.module';
import { RoomsModule } from './rooms/rooms.module';
import { CoursesModule } from './courses/courses.module';
import { GroupsModule } from './groups/groups.module';

@Module({
  imports: [BranchesModule, RoomsModule, CoursesModule, GroupsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
