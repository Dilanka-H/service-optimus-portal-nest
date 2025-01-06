import { Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @UseGuards(LocalGuard)
    login(@Request() request) {
        return this.authService.signIn(request.user)
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getUserInfo(@Request() request) {
        return request.user
    }
}
