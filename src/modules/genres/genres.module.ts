import { Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import { genresProviders } from './genre.provider';
import { AuthModule } from '../auth/auth.module';
import { LocalStrategy } from '../auth/strategy/local.strategy';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';
import { RolesGuard } from '../auth/guards/roles-guards';
import { JwtAuthGuard } from '../auth/guards/jwt-guards';
import { UsersModule } from '../users/users.module';
// import { GenresResolver } from './genres.resolver';
import { GenresResolver } from './genres.resolver';

@Module({
  imports: [AuthModule, UsersModule],

  providers: [GenresService, ...genresProviders, RolesGuard, JwtAuthGuard, GenresResolver],
  controllers: [GenresController],
})
export class GenresModule {}
