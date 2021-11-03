import { Module } from '@nestjs/common';
import { ProductionHouseService } from './production-house.service';
import { ProductionHouseController } from './production-house.controller';
import { productionHouseProviders } from './production-house.providers';
import { LocalStrategy } from '../auth/strategy/local.strategy';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';
import { RolesGuard } from '../auth/guards/roles-guards';
import { JwtAuthGuard } from '../auth/guards/jwt-guards';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [UsersModule, AuthModule],
  providers: [
    ProductionHouseService,
    ...productionHouseProviders,
    RolesGuard,
    JwtAuthGuard,
  ],
  controllers: [ProductionHouseController],
})
export class ProductionHouseModule {}
