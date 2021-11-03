import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Movie } from './movie.entity';
import { MovieDto } from './movieDto';
import { MOVIE_REPOSITORY } from '../../core/constants';
import { MovieActor } from './MovieActor.entity';
import { MovieActorService } from './movieActor.service';
import { MovieDirectorService } from '../movie-director/movie-director.service';
import { MovieDirector } from '../movie-director/movie-director.entity';
import { MovieGenresService } from '../movie-genres/movie-genres.service';
import { MovieGenre } from '../movie-genres/movie_genre.entity';
import { Person } from '../persons/persons.entity';
import { Genre } from '../genres/genre.entity';
import { extname } from 'path';
import { Op } from 'sequelize';
import * as searchBuilder from 'sequelize-search-builder';
import APIFeatures from 'src/utlis/apiFeature';
import { title } from 'node:process';
import { UpdateMovieInput } from './dtos/inputs/update-movie.input';

// import { ProductionHouse } from '../production-house/production-house.entity';

@Injectable()
export class MovieService {
  constructor(
    @Inject(MOVIE_REPOSITORY) private readonly movieRepository: typeof Movie,

    private movieActorServices: MovieActorService,
    private movieDirectorServices: MovieDirectorService,
    private movieGenreServices: MovieGenresService,
  ) {}

  async create(movieData) {
    // const ProductionHouseId=movieData.ProductionHouseId;
    console.log(movieData);
    const movie = await this.movieRepository.create<Movie>(
      (movieData as unknown) as Movie,
    );
    if (!movie) {
      throw new HttpException(
        'same email is not allowed',
        HttpStatus.FORBIDDEN,
      );
    }
    const id = movie.id;
    let movieActor, movieDirector, movieGenre;

    if (movieData.actors) {
      movieData.actors.forEach(async (element) => {
        movieActor = {
          actorID: element,
          movieID: id,
        };
        const movieActorInstance = this.movieActorServices.create(movieActor);
        console.log(movieActorInstance);
      });
    }
    if (movieData.directors) {
      movieData.directors.forEach(async (element) => {
        movieDirector = {
          directorID: element,
          movieID: id,
        };
        const movieActorInstance = this.movieDirectorServices.create(
          movieDirector,
        );
        console.log(movieActorInstance);
      });
    }
    if (movieData.genres) {
      movieData.genres.forEach(async (element) => {
        movieGenre = {
          genreID: element,
          movieID: id,
        };
        const movieActorInstance = this.movieGenreServices.create(movieGenre);
        console.log(movieActorInstance);
      });
    }

    if (!movie) {
      throw new HttpException(
        'same email is not allowed',
        HttpStatus.FORBIDDEN,
      );
    }

    return movie;
  }

  async findOneByTitle(title: string): Promise<Movie> {
    return await this.movieRepository.findOne<Movie>({
      where: { title },
      include: [
        { model: MovieActor, include: [{ model: Person }] },
        { model: MovieDirector, include: [{ model: Person }] },
        { model: MovieGenre, include: [{ model: Genre }] },
      ],
    });
  }

  public async findOneById(id: number): Promise<Movie> {
    const movie = await this.movieRepository.findOne<Movie>({
      where: { id },
      include: [
        { model: MovieActor, include: [{ model: Person }] },
        { model: MovieDirector, include: [{ model: Person }] },
        { model: MovieGenre, include: [{ model: Genre }] },
      ],
    });
    console.log(movie);
    return movie;
  }

  async findAll() {
    const movie: any = await this.movieRepository.findAll({
      include: [
        { model: MovieActor, include: [{ model: Person }] },
        { model: MovieDirector, include: [{ model: Person }] },
        { model: MovieGenre, include: [{ model: Genre }] },
      ],
    });
    console.log(movie);
    let resultsArray: MovieDto[] = [];
    movie.forEach((element) => {
      const {
        MovieActor,
        MovieDirector,
        MovieGenre,
        updatedAt,
        createdAt,
        userId,
        price,
        paid,
        ...result
      } = element['dataValues'];
      resultsArray.push(result);
    });
    return resultsArray;
  }
  async findAllMovies(req): Promise<Movie> {
    const pageAsNumber = Number.parseInt(req.query.page);
    const limitAsNumber = Number.parseInt(req.query.limit);
    let page = 0;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
      page = pageAsNumber;
    }
    let limit = 10;
    if (
      !Number.isNaN(limitAsNumber) &&
      limitAsNumber > 0 &&
      limitAsNumber < 10
    ) {
      limit = limitAsNumber;
    }
    const movie: any = await this.movieRepository.findAndCountAll<Movie>({
      limit: limit,
      offset: page * limit,
      include: [
        { model: MovieActor, include: [{ model: Person }] },
        { model: MovieDirector, include: [{ model: Person }] },
        { model: MovieGenre, include: [{ model: Genre }] },
      ],
    });

    return movie as any;
  }

  async deleteMovie(id: number): Promise<Movie> {
    const Movie: Movie = await this.movieRepository
      .findOne({
        where: { id },
      })
      .then((result) => {
        return this.movieRepository.destroy({ where: { id } }).then((u) => {
          return result;
        });
      });
    if (!Movie) {
      throw new HttpException('No Data Found', HttpStatus.NOT_FOUND);
    }
    return Movie;
  }

  async update(id: number, body) {
    let movie = await this.movieRepository.findOne({ where: { id } });
    movie.userId = body.UserId;
    console.log(movie);
    if (body.title != null) {
      console.log(body.title);

      movie.title = body.title;
      console.log(body.title);
    }
    if (body.coverPhoto != null) {
      console.log(body.coverPhoto);
      const cp: string = body.coverPhoto;

      movie.coverPhoto = cp;
    }
    if (body.trailer != null) {
      movie.trailer = body.trailer;
    }
    if (body.description != null) {
      movie.description = body.description;
    }
    if (body.ProductionHouseId != null) {
      movie.ProductionHouseId = body.ProductionHouseId;
    }
    movie.save();
    return movie;
  }

  public async averageRating(movies: any, id: number) {
    const movie: Movie = await this.findOneById(id);

    let count = 0;
    let avgRate: number = 0;
    movies.forEach((el) => {
      avgRate = avgRate + el.rate;
      count = count + 1;
    });
    avgRate = avgRate / count;
    console.log(avgRate);
    movie.averageRating = avgRate;
    movie.save();
    return movie.averageRating;
  }
  async findMovieOfAvgRating(rate: number) {
    const movie: Movie[] = await this.movieRepository.findAll<Movie>({
      where: { averageRating: { [Op.gte]: rate } },
      include: [
        { model: MovieActor, include: [{ model: Person }] },
        { model: MovieDirector, include: [{ model: Person }] },
        { model: MovieGenre, include: [{ model: Genre }] },
      ],
    });
  }

  async searchGql(req) {
    // const filter = req.query.filter;
    // console.log(req);
    // const data = req.query;
    Object.entries(req).forEach(([key, val]: any) =>
      isNaN(val) ? (req[key] = { [Op.like]: '%' + val + '%' }) : val,
    );
    console.log(req);
    return await this.movieRepository.findAll <Movie>({
      where: req,
    });
    //   console.log(movie);
    //   return movie;
  }
  async search(req) {
    // const filter = req.query.filter;
    // console.log(req);
    const data = req.query;
    Object.entries(data).forEach(([key, val]: any) =>
      isNaN(val) ? (data[key] = { [Op.like]: '%' + val + '%' }) : val,
    );
    console.log(data);
    const movie = await this.movieRepository.findAndCountAll({
      where: data,
    });
    console.log(movie['dataValues']);
    return movie;
    // const search = new searchBuilder(Movie, req.query),
    //   whereQuery = search.getWhereQuery(),
    //   orderQuery = search.getOrderQuery(),
    //   limitQuery = search.getLimitQuery(),
    //   offsetQuery = search.getOffsetQuery();

    // return await Movie.findAll({
    //   include: [{ all: true, nested: true, duplicating: false }],
    //   where: whereQuery,
    //   order: orderQuery,
    //   limit: limitQuery,
    //   offset: offsetQuery,
    //   logging: console.log,
    // });
  }
}

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|PNG)$/)) {
    return callback(
      new HttpException(
        'only jpg|jpeg|png|gif files allow',
        HttpStatus.FORBIDDEN,
      ),
      false,
    );
  }
  callback(null, true);
};

export const editFileName = async (req, file, callback) => {
  console.log(req.params.id);
  const id = req.params.id;
  const movie = await Movie.findOne({ where: { id } });
  console.log(movie);

  const name = movie.title;
  const fileExtName = extname(file.originalname);

  callback(null, `${name}${fileExtName}`);
};
