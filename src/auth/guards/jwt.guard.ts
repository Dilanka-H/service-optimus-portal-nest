// guards/jwt-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    // handleRequest(err, user, info, context: ExecutionContext) {
    //     if (err || !user) {
    //       console.log('Invalid token or authentication error:', err || info);
    //       throw new HttpException('Test error', HttpStatus.BAD_REQUEST);
    //     }
    //     return user;
    //   }
}
