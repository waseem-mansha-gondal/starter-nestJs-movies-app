import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles-guards';
import { JwtAuthGuard } from './guards/jwt-guards';
import { GoogleStrategy } from './strategy/google.strategy';
import { FacebookStrategy } from './strategy/facebook.strategy';
import { localAuthGuard } from './guards/local-guard';
import { AuthResolver } from './auth.resolver';
import { AuthController } from './auth.controller';

@Module({
  exports: [RolesGuard, JwtAuthGuard],
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.register({
      secret: process.env.JWTKEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
    }),
  ],
  providers: [
    AuthResolver,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RolesGuard,
    JwtAuthGuard,
    localAuthGuard,
    GoogleStrategy,
    FacebookStrategy,
    AuthResolver,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
