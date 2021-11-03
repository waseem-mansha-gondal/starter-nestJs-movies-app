import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './core/database/database.module';
import { MovieModule } from './modules/movie/movie.module';
import { ProductionHouseModule } from './modules/production-house/production-house.module';
import { PersonsModule } from './modules/persons/persons.module';
import { MovieDirectorModule } from './modules/movie-director/movie-director.module';
import { GenresModule } from './modules/genres/genres.module';
import { MovieGenresModule } from './modules/movie-genres/movie-genres.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { RateingModule } from './modules/rateing/rateing.module';
import { ReviewModule } from './modules/review/review.module';
import { ProfileModule } from './modules/profile/profile.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health/health.controller';
import { HealthModule } from './health/health.module';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      context: ({ req }) => ({}),
    }),
    TerminusModule,
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, './src/uploads'),
    // }),
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MovieModule,
    ProductionHouseModule,
    PersonsModule,
    MovieDirectorModule,
    GenresModule,
    MovieGenresModule,
    UsersModule,
    AuthModule,
    RateingModule,
    ReviewModule,
    ProfileModule,
    HealthModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
