import { MOVIEACTOR_REPOSITORY } from '../../core/constants';
import { MovieActor } from './MovieActor.entity';

export const movieActorProviders = [
  {
    provide: MOVIEACTOR_REPOSITORY,
    useValue: MovieActor,
  },
];
