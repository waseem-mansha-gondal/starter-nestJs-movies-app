import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { GENRE_REPOSITORY } from 'src/core/constants';
import { MovieGenre } from '../movie-genres/movie_genre.entity';
import { Movie } from '../movie/movie.entity';
import { GenreDto } from './genre.dto';
import { Genre } from './genre.entity';
import * as searchBuilder from 'sequelize-search-builder';

@Injectable()
export class GenresService {
  constructor(
    @Inject(GENRE_REPOSITORY) private readonly genreRepository: typeof Genre,
  ) {}

  async create(genre: GenreDto): Promise<Genre> {
    return await this.genreRepository.create<Genre>(
      (genre as unknown) as Genre,
    );
  }
  async findAll(): Promise<Genre[]> {
    const genre: Genre[] = await this.genreRepository.findAll<Genre>({
      include: [{ model: MovieGenre, include: [{ model: Movie }] }],
    });
    console.log(genre);
    if (genre.length == 0) {
      throw new HttpException('No Data Found', HttpStatus.NOT_FOUND);
    }
    return genre;
  }
  async findOneByName(name: string): Promise<Genre> {
    const genre: Genre = await this.genreRepository.findOne<Genre>({
      where: { name },
      include: [{ model: MovieGenre, include: [{ model: Movie }] }],
    });
    if (!genre) {
      throw new HttpException('No Data Found', HttpStatus.NOT_FOUND);
    }

    return genre;
  }

  async findOneById(id: number): Promise<Genre> {
    const genre: Genre = await this.genreRepository.findOne<Genre>({
      where: { id },
      include: [{ model: MovieGenre, include: [{ model: Movie }] }],
    });
    if (!genre) {
      throw new HttpException('No Data Found', HttpStatus.NOT_FOUND);
    }

    return genre;
  }

  async deletePerson(id: number): Promise<Genre> {
    const genre: Genre = await this.genreRepository
      .findOne({
        where: { id },
      })
      .then((result) => {
        return this.genreRepository.destroy({ where: { id } }).then((u) => {
          return result;
        });
      });
    if (!genre) {
      throw new HttpException('No Data Found', HttpStatus.NOT_FOUND);
    }
    return genre;
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

    const search = new searchBuilder(Genre, req.query),
      whereQuery = search.getWhereQuery(),
      orderQuery = search.getOrderQuery(),
      limitQuery = search.getLimitQuery(),
      offsetQuery = search.getOffsetQuery();

    return await Genre.findAll({
      include: [{ all: true, nested: true, duplicating: false }],
      where: whereQuery,
      order: orderQuery,
      limit: limitQuery,
      offset: offsetQuery,
      logging: console.log,
    });
  }
}
