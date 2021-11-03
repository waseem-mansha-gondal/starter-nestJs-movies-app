import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { profileProviders } from './profile.providers';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  providers: [ProfileService, ...profileProviders],
  controllers: [ProfileController],
})
export class ProfileModule {}
