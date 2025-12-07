import { Module } from '@nestjs/common';
import { FileUploadController } from './fileUploads.controller';


@Module({
    controllers: [FileUploadController]
})
export class FileUploadModule {}
