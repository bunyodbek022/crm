import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BranchesModule } from './modules/branches/branches.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { CoursesModule } from './modules/courses/courses.module';
import { GroupsModule } from './modules/groups/groups.module';
import { PrismaModule } from './prisma/prisma.module';
import { CloudinaryModule } from 'nestjs-cloudinary';
import { FileUploadModule } from './uploads/fileUploads.module';
import { ConfigModule } from '@nestjs/config';
import { TeachersModule } from './modules/teachers/teachers.module';
import { StudentsModule } from './modules/students/students.module';
import { StaffsModule } from './modules/staffs/staffs.module';
import { MailModule } from './common/mailer/mailer.module';

@Module({
  imports: [
    BranchesModule,
    RoomsModule,
    CoursesModule,
    GroupsModule,
    FileUploadModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CloudinaryModule.forRootAsync({
      useFactory: () => ({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
      }),
    }),
    PrismaModule,
    TeachersModule,
    StudentsModule,
    StaffsModule,
    MailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
