import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflect: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflect.get<Role[]>('roles', context.getHandler());
    console.log('!!!', roles);
    if (!roles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    console.log('???', user);

    if (!user || !user.roles) {
      throw new ForbiddenException('User roles are missing');
    }

    const hasRole = () => user.roles.some((role) => roles.includes(role));

    if (!hasRole()) {
      throw new ForbiddenException('User does not have the right roles');
    }

    return true;
  }
}
