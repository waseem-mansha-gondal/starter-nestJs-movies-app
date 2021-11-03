import { ProductionHouse } from './production-house.entity';
import { PRODUCTIONHOUSE_REPOSITORY } from '../../core/constants';

export const productionHouseProviders = [
  {
    provide: PRODUCTIONHOUSE_REPOSITORY,
    useValue: ProductionHouse,
  },
];
