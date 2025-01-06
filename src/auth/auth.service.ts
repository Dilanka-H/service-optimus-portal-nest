import { Injectable } from '@nestjs/common';
import { AuthInput, AuthResult, SignInData } from './interface';
import { UserService } from 'src/domain/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}
    async validateUser(input: AuthInput): Promise<SignInData | null> {
        const user = await this.userService.findUserByName(input.username)

        if (user && user.password === input.password) {
            return {
                userId: user.userId,
                username: user.username
            }
        }

        return null
    }

    async signIn(user: SignInData): Promise<AuthResult> {
        try {
            const tokenPayload = {
                sub: user.userId,
                username: user.username
            };
            const accessToken = await this.jwtService.signAsync(tokenPayload);
            return { accesToken: accessToken, username: user.username, userId: user.userId };
        } catch (error) {
            throw new Error("Failed to generate JWT token.");
        }
    }
}
