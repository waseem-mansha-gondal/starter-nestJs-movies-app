import { GENRE_REPOSITORY } from '../../core/constants';
import { Genre } from './genre.entity';

export const genresProviders = [
  {
    provide: GENRE_REPOSITORY,
    useValue: Genre,
  },
];
