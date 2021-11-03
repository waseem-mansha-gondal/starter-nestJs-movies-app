import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Person } from './persons.entity';
import { PersonDto } from './personDTO';
import { PERSON_REPOSITORY } from '../../core/constants/index';
import { Movie } from '../movie/movie.entity';
import { MovieActor } from '../movie/MovieActor.entity';
import { MovieDirector } from '../movie-director/movie-director.entity';
import * as searchBuilder from 'sequelize-search-builder';

@Injectable()
export class PersonsService {
  constructor(
    @Inject(PERSON_REPOSITORY) private readonly personRepository: typeof Person,
  ) {}

  async create(person: PersonDto): Promise<Person> {
    return await this.personRepository.create<Person>(
      (person as unknown) as Person,
    );
  }
  async findAll(): Promise<Person[]> {
    const person: Person[] = await this.personRepository.findAll<Person>({
      include: [
        { model: MovieActor, include: [{ model: Movie }] },
        { model: MovieDirector, include: [{ model: Movie }] },
      ],
    });
    console.log(person);
    if (person.length == 0) {
      throw new HttpException('No Data Found', HttpStatus.NOT_FOUND);
    }

    return person;
  }

  async findOneByEmail(email: string): Promise<Person> {
    const person: Person = await this.personRepository.findOne<Person>({
      where: { email },
      include: [
        { model: MovieActor, include: [{ model: Movie }] },
        { model: MovieDirector, include: [{ model: Movie }] },
      ],
    });
    if (!person) {
      throw new HttpException('No Data Found', HttpStatus.NOT_FOUND);
    }

    return person;
  }
  async findOneByName(name: string): Promise<Person> {
    const person: Person = await this.personRepository.findOne<Person>({
      where: { name },
      include: [
        { model: MovieActor, include: [{ model: Movie }] },
        { model: MovieDirector, include: [{ model: Movie }] },
      ],
    });
    if (!person) {
      throw new HttpException('No Data Found', HttpStatus.NOT_FOUND);
    }

    return person;
  }
  async findOneById(id: number): Promise<Person> {
    const person: Person = await this.personRepository.findOne<Person>({
      where: { id },
    });
    if (!person) {
      throw new HttpException('No Data Found', HttpStatus.NOT_FOUND);
    }

    return person;
  }

  async deletePerson(id: number): Promise<Person> {
    const person: Person = await this.personRepository
      .findOne({
        where: { id },
      })
      .then((result) => {
        return this.personRepository.destroy({ where: { id } }).then((u) => {
          return result;
        });
      });
    if (!person) {
      throw new HttpException('No Data Found', HttpStatus.NOT_FOUND);
    }
    return person;
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

    const search = new searchBuilder(Person, req.query),
      whereQuery = search.getWhereQuery(),
      orderQuery = search.getOrderQuery(),
      limitQuery = search.getLimitQuery(),
      offsetQuery = search.getOffsetQuery();

    return await Person.findAll({
      include: [{ all: true, nested: true, duplicating: false }],
      where: whereQuery,
      order: orderQuery,
      limit: limitQuery,
      offset: offsetQuery,
      logging: console.log,
    });
  }
}
