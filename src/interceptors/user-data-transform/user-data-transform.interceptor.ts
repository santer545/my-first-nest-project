import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable()
export class UserDataTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    if (request.method === 'POST') {
      const { name, email, id, password } = request.body;

      if (!name || !email || !id || !password) {
        throw new BadRequestException('Please provide all the required fields');
      }
    }
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map((item) => this.transformData(item));
        } else if (data && typeof data === 'object') {
          return this.transformData(data);
        }

        return data;
      }),
      catchError((error) => {
        return throwError(() => {
          return new NotFoundException('Please give a valid Id');
        });
      }),
    );
  }

  private transformData(data: any) {
    const { password, ...result } = data;
    return result;
  }
}
