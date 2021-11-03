import { Sequelize } from 'sequelize-typescript';
import * as dotenv from 'dotenv';
// import { Movie } from 'src/modules/movie/movie.entity';
// import { ProductionHouse } from 'src/modules/production-house/production-house.entity';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';
import { any } from 'sequelize/types/lib/operators';
import { Movie } from 'src/modules/movie/movie.entity';
import { ProductionHouse } from 'src/modules/production-house/production-house.entity';
import { Person } from 'src/modules/persons/persons.entity';
import { MovieActor } from 'src/modules/movie/MovieActor.entity';
import { MovieDirector } from 'src/modules/movie-director/movie-director.entity';
import { Genre } from 'src/modules/genres/genre.entity';
import { MovieGenre } from 'src/modules/movie-genres/movie_genre.entity';
import { User } from 'src/modules/users/user.entity';
import { Rate } from 'src/modules/rateing/rate.entity';
import { Review } from 'src/modules/review/review.entity';
import { Profile } from 'src/modules/profile/profile.entity';
dotenv.config();
export let sequelize;
export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async function connection() {
      let config;
      console.log(process.env.NODE_ENV);
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          console.log(process.env.NODE_ENV);
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }

      sequelize = new Sequelize(config);
      sequelize.addModels([
        Movie,
        ProductionHouse,
        Person,
        MovieActor,
        MovieDirector,
        Genre,
        MovieGenre,
        User,
        Rate,
        Review,
        Profile,
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];

// export const sequelize = new Sequelize(configOne);
