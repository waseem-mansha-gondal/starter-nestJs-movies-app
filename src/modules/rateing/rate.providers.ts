import { RATE_REPOSITORY } from '../../core/constants';
import { Rate } from './rate.entity';

export const rateProviders = [
  {
    provide: RATE_REPOSITORY,
    useValue: Rate,
  },
];
