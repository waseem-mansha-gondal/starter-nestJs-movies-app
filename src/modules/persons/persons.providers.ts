import { Person } from './persons.entity';
import { PERSON_REPOSITORY } from '../../core/constants';

export const personsProviders = [
  {
    provide: PERSON_REPOSITORY,
    useValue: Person,
  },
];
