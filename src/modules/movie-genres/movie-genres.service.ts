import { Inject, Injectable } from '@nestjs/common';
import { MOVIEGENRE_REPOSITORY } from 'src/core/constants';
import { genreMovieDTO } from './movie_genre.dto';
import { MovieGenre } from './movie_genre.entity';

@Injectable()
export class MovieGenresService {
  constructor(
    @Inject(MOVIEGENRE_REPOSITORY)
    private readonly movieGenreProviders: typeof MovieGenre,
  ) {}

  async create(movieGenre: genreMovieDTO) {
    return this.movieGenreProviders.create<MovieGenre>(
      (movieGenre as unknown) as MovieGenre,
    );
  }
}
