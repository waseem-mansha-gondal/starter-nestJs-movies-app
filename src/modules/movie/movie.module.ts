import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { moviesProviders } from './movies.providers';
import { movieActorProviders } from './MovieActor.providers';
import { MovieActorService } from './movieActor.service';
import { MovieDirectorModule } from '../movie-director/movie-director.module';
import { MovieGenresModule } from '../movie-genres/movie-genres.module';
import { PersonsModule } from '../persons/persons.module';
import { GenresModule } from '../genres/genres.module';
import { ProductionHouseModule } from '../production-house/production-house.module';
import { MulterModule } from '@nestjs/platform-express';
import { LocalStrategy } from '../auth/strategy/local.strategy';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';
import { RolesGuard } from '../auth/guards/roles-guards';
import { JwtAuthGuard } from '../auth/guards/jwt-guards';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { MovieResolver } from './movie.resolver';
import { MovieController } from './movie.controller';

@Module({
  imports: [
    MulterModule.register({
      dest: './src/uploads',
    }),
    AuthModule,
    MovieDirectorModule,
    MovieGenresModule,
    PersonsModule,
    GenresModule,
    ProductionHouseModule,
    UsersModule,
  ],
  providers: [
    MovieService,
    MovieActorService,
    ...moviesProviders,
    ...movieActorProviders,
    RolesGuard,
    JwtAuthGuard,
    MovieResolver,
  ],
  exports: [MovieService],
  controllers: [MovieController],
})
export class MovieModule {}
