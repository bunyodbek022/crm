import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) { }
    
    async sendMail(email: string, subject: string, password: string) {
        await this.mailerService.sendMail({
            to: email,
            subject,
            template: "index",
            context: {
                password,
                year: new Date().getFullYear()
            }
        })
    }
}
