import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BranchesModule } from './branches/branches.module';
import { RoomsModule } from './rooms/rooms.module';
import { CoursesModule } from './courses/courses.module';
import { GroupsModule } from './groups/groups.module';
import { PrismaModule } from './prisma/prisma.module';
import { CloudinaryModule } from 'nestjs-cloudinary';
import { FileUploadModule } from './uploads/fileUploads.module';
import { ConfigModule } from '@nestjs/config';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
