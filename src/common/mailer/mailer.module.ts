import { MailerModule } from "@nestjs-modules/mailer";
import { Global, Module } from "@nestjs/common";
import { join } from "path";
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from "./mailer.service";


@Global()
@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                service: "gmail",
                auth: {
                    user: process.env.EMAIL,
                    pass : process.env.APP_PASSWORD
                }
            },
            defaults: {
                from : "Project Team<gulomjonovbunyodbek60@gmail.com>"
            },
            template: {
                dir: join(process.cwd(), "src", "template"),
                adapter: new HandlebarsAdapter(),
                options: {
                    strict : true
                }

            }
        })
    ],
    providers: [MailService],
    exports: [MailService]
})

export class MailModule{}