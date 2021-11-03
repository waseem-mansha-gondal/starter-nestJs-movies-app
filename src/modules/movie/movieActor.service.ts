import { Inject, Injectable } from '@nestjs/common';
import { MOVIEACTOR_REPOSITORY } from 'src/core/constants';
import { PersonsService } from '../persons/persons.service';

import { actorMovieDTO } from './actormovie.dto';
import { MovieActor } from './MovieActor.entity';

@Injectable()
export class MovieActorService {
  constructor(
    @Inject(MOVIEACTOR_REPOSITORY)
    private readonly movieActorProviders: typeof MovieActor,
    private PersonsService: PersonsService,
  ) {}

  async create(movieActor: actorMovieDTO) {
    return this.movieActorProviders.create<MovieActor>(
      (movieActor as unknown) as MovieActor,
    );
  }
}
