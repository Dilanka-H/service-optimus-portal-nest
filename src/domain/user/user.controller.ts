import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { JWTConfiguration } from 'src/config/jwt.config';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService,
    private jwtConfig: JWTConfiguration
  ) {}

  @Get()
  getUser() {
    return this.userService.getUser();
  }
}
