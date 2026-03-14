import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Role } from '../enums/role.enum';

type UserKey = 'id' | 'name' | 'email' | 'role';

export const Authorized = (key: UserKey) =>
  createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user ? request.user[key] : null;
  })();
