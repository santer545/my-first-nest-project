import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    request.headers['Content-Type'] = 'application/json';
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          statusCode: context.switchToHttp().getResponse().statusCode,
          transformed: true,
        };
      }),
    );
  }
}
