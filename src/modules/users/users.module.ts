import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';
import { usersProviders } from './user.providers';
import { MovieModule } from '../movie/movie.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWTKEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
    }),
  ],
  providers: [UsersService, ...usersProviders, JwtStrategy],
  exports: [UsersService],
})
export class UsersModule {}
