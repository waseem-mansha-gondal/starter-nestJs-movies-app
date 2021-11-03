import { MOVIEDIRECTOR_REPOSITORY } from '../../core/constants';
import { MovieDirector } from './movie-director.entity';

export const movieDirectorProviders = [
  {
    provide: MOVIEDIRECTOR_REPOSITORY,
    useValue: MovieDirector,
  },
];
