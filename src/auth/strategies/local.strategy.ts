import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { AuthInput, SignInData } from "../interface";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService){
        super()
    }
    async validate(username: string, password: string): Promise<any> {
        const input: AuthInput = {
            username: username,
            password: password
        }
        const user: SignInData = await this.authService.validateUser(input)
        if (!user) {
            // throw new UnauthorizedException();
        }

        return user
    }
}