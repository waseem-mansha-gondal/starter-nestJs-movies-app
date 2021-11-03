import { Module } from '@nestjs/common';
import { movieDirectorProviders } from './movie-director.provider';
import { MovieDirectorService } from './movie-director.service';

@Module({
  providers: [MovieDirectorService, ...movieDirectorProviders],
  exports: [MovieDirectorService],
})
export class MovieDirectorModule {}
