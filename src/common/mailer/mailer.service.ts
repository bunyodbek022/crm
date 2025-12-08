import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) { }
    
    async sendMail(email: string, subject: string, code: number) {
        await this.mailerService.sendMail({
            to: email,
            subject,
            template: "index",
            context: {
                code,
                year: new Date().getFullYear()
            }
        })
    }
}
