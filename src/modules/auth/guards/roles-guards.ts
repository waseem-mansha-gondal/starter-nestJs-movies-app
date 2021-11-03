import {
  CanActivate,
  ExecutionContext,
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { User } from 'src/modules/users/user.entity';
import { UsersService } from 'src/modules/users/users.service';
import { CurrentUser } from '../current-user.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UsersService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    // console.log(roles);
    if (!roles) {
      return true;
    }

    let user: User;
    if (context.getType() === 'http') {
      const request = context.switchToHttp().getRequest();
      user = request.user;
    } else {
      const ctx = GqlExecutionContext.create(context);
      console.log(ctx.getContext().req);
      user = ctx.getContext().req.user;
    }
    // console.log(user);
    const bool = matchRoles(roles, user.role);
    return user && bool;
  }
}
function matchRoles(
  roles: string[],
  userRoles: string,
): boolean | Promise<boolean> | Observable<boolean> {
  let hasPermission = false;
  // console.log(userRoles);

  roles.forEach((element) => {
    if (element == userRoles) {
      // console.log(element);
      // console.log(userRoles);
      hasPermission = true;
    }
  });

  return hasPermission;
}
