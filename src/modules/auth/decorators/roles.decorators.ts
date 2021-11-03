import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/modules/roles.enum';

export const hasRoles = (...hasRoles: Role[]) => SetMetadata('roles', hasRoles);
