import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from 'src/services/user/user.service';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private userService: UserService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];
    console.log('Token =', token);

    if (!token) {
      throw new UnauthorizedException('You are not authorized');
    }

    const userId = request.params.id;
    console.log('userId = ', userId);
    const user = this.userService.findUser(+userId);

    if (!user || user.password !== token) {
      throw new UnauthorizedException('Token is invalid or expired');
    }
    return next.handle();
  }
}
