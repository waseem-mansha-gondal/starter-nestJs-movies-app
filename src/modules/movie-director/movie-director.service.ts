import { Inject, Injectable } from '@nestjs/common';
import { MOVIEDIRECTOR_REPOSITORY } from 'src/core/constants';
import { directorMovieDTO } from './directorMovieDto';
import { MovieDirector } from './movie-director.entity';

@Injectable()
export class MovieDirectorService {
  constructor(
    @Inject(MOVIEDIRECTOR_REPOSITORY)
    private readonly movieDirectorProviders: typeof MovieDirector,
  ) {}

  async create(movieActor: directorMovieDTO) {
    return this.movieDirectorProviders.create<MovieDirector>(
      (movieActor as unknown) as MovieDirector,
    );
  }
}
