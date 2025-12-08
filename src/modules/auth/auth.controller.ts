import { Body, Controller, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { loginUserDto } from "./dto/login-user.dto";
import type { Response } from 'express';


@Controller('auth')

export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('student/login')
    loginStudent(@Body() dto: loginUserDto, @Res() res: Response) {
        return this.authService.loginStudent(dto, res);
    }
    
}