import { Module } from '@nestjs/common';
import { RatingService } from './rateing.service';
import { RateingController } from './rateing.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LocalStrategy } from '../auth/strategy/local.strategy';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';
import { RolesGuard } from '../auth/guards/roles-guards';
import { JwtAuthGuard } from '../auth/guards/jwt-guards';
import { UsersModule } from '../users/users.module';
import { rateProviders } from './rate.providers';
import { MovieModule } from '../movie/movie.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    MovieModule,
    JwtModule.register({
      secret: process.env.JWTKEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
    }),
  ],
  providers: [RatingService, ...rateProviders, JwtAuthGuard, RolesGuard],
  controllers: [RateingController],
})
export class RateingModule {}
