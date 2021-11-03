import { Module } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { PersonsController } from './persons.controller';
import { personsProviders } from './persons.providers';
import { AuthModule } from '../auth/auth.module';
import { LocalStrategy } from '../auth/strategy/local.strategy';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';
import { RolesGuard } from '../auth/guards/roles-guards';
import { JwtAuthGuard } from '../auth/guards/jwt-guards';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule, AuthModule],

  exports: [PersonsService],
  providers: [PersonsService, ...personsProviders, RolesGuard, JwtAuthGuard],
  controllers: [PersonsController],
})
export class PersonsModule {}
