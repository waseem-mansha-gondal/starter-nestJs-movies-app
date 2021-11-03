import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PRODUCTIONHOUSE_REPOSITORY } from 'src/core/constants';
import { Movie } from '../movie/movie.entity';
import { ProductionHouse } from './production-house.entity';
import { ProductionDto } from './ProductionHouse.dto';
import * as searchBuilder from 'sequelize-search-builder';

@Injectable()
export class ProductionHouseService {
  constructor(
    @Inject(PRODUCTIONHOUSE_REPOSITORY)
    private readonly proHRepository: typeof ProductionHouse,
  ) {}
  async create(person: ProductionDto): Promise<ProductionHouse> {
    return await this.proHRepository.create<ProductionHouse>(
      (person as unknown) as ProductionHouse,
    );
  }
  async findAll(): Promise<ProductionHouse[]> {
    const proHouse: ProductionHouse[] = await this.proHRepository.findAll<ProductionHouse>(
      { include: [{ model: Movie }] },
    );
    console.log(proHouse);
    if (proHouse.length == 0) {
      throw new HttpException('No Data Found', HttpStatus.NOT_FOUND);
    }

    return proHouse;
  }

  async findOneByName(name: string): Promise<ProductionHouse> {
    const proHouse: ProductionHouse = await this.proHRepository.findOne<ProductionHouse>(
      {
        where: { name },
      },
    );
    if (!proHouse) {
      throw new HttpException('No Data Found', HttpStatus.NOT_FOUND);
    }

    return proHouse;
  }
  async findOneById(id: number): Promise<ProductionHouse> {
    const proHouse: ProductionHouse = await this.proHRepository.findOne<ProductionHouse>(
      {
        where: { id },
      },
    );
    if (!proHouse) {
      throw new HttpException('No Data Found', HttpStatus.NOT_FOUND);
    }

    return proHouse;
  }

  async deletePerson(id: number): Promise<ProductionHouse> {
    const proHouse: ProductionHouse = await this.proHRepository
      .findOne({
        where: { id },
      })
      .then((result) => {
        return this.proHRepository.destroy({ where: { id } }).then((u) => {
          return result;
        });
      });
    if (!proHouse) {
      throw new HttpException('No Data Found', HttpStatus.NOT_FOUND);
    }
    return proHouse;
  }
  async search(req) {
    // const filter = req.query.filter;
    // console.log(req.query.filter);
    // const data = req.query;
    // Object.entries(data).forEach(([key, val]: any) =>
    //   isNaN(val) ? (data[key] = { [Op.like]: '%' + val + '%' }) : val,
    // );
    // console.log(data);
    // return await this.movieRepository.findAndCountAll({
    //   where: data,
    // });

    const search = new searchBuilder(ProductionHouse, req.query),
      whereQuery = search.getWhereQuery(),
      orderQuery = search.getOrderQuery(),
      limitQuery = search.getLimitQuery(),
      offsetQuery = search.getOffsetQuery();

    return await ProductionHouse.findAll({
      include: [{ all: true, nested: true, duplicating: false }],
      where: whereQuery,
      order: orderQuery,
      limit: limitQuery,
      offset: offsetQuery,
      logging: console.log,
    });
  }
}
