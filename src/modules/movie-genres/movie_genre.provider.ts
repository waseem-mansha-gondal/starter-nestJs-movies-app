import { MOVIEGENRE_REPOSITORY } from '../../core/constants';
import { MovieGenre } from './movie_genre.entity';

export const movieGenreProviders = [
  {
    provide: MOVIEGENRE_REPOSITORY,
    useValue: MovieGenre,
  },
];
