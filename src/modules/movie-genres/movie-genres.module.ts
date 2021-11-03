import { Module } from '@nestjs/common';
import { MovieGenresService } from './movie-genres.service';
import { movieGenreProviders } from './movie_genre.provider';

@Module({
  providers: [MovieGenresService, ...movieGenreProviders],
  exports: [MovieGenresService],
})
export class MovieGenresModule {}
