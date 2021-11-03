import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../auth/current-user.decorator';
import { hasRoles } from '../auth/decorators/roles.decorators';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles-guards';
import { Role } from '../roles.enum';
import { User } from '../users/user.entity';
import { GetMovieArgs } from './dtos/args/get-movie.args';
import { SearchMovieArgs } from './dtos/args/get-search.args';
import { CreateMovieInput } from './dtos/inputs/create-movie.input';
import { DeleteMovieInput } from './dtos/inputs/delete-movie.input';
import { UpdateMovieInput } from './dtos/inputs/update-movie.input';
import { Movie } from './movie.entity';
import { MovieService } from './movie.service';
import { MovieDto } from './movieDto';

@Resolver()
export class MovieResolver {
  constructor(private movieServices: MovieService) {}

  @Query(() => [MovieDto])
  // @UseGuards(JwtAuthGuard)
  // @hasRoles(Role.Admin)
  async getAllMovie() {
    return await this.movieServices.findAll();
  }

  @Query(() => MovieDto)
  async getMovie(@Args() getMovieArgs: GetMovieArgs) {
    return this.movieServices.findOneById(getMovieArgs.MovieId);
  }
  @Query(() => [MovieDto])
  async search(@Args() searchMovieArgs: SearchMovieArgs) {
    return this.movieServices.searchGql(searchMovieArgs);
  }

  @hasRoles(Role.Admin)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => MovieDto)
  async createMovie(
    @CurrentUser() user: User,
    @Args('CreateMovie') crateMovieData: CreateMovieInput,
  ) {
    crateMovieData.UserId = user.id;
    return this.movieServices.create(crateMovieData);
  }

  @hasRoles(Role.Admin)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => MovieDto)
  async updateMovie(
    @CurrentUser() user: User,
    @Args('Update') updateMovieInput: UpdateMovieInput,
  ) {
    updateMovieInput.UserId = user.id;
    return this.movieServices.update(
      updateMovieInput.MovieId,
      updateMovieInput,
    );
  }

  @hasRoles(Role.Admin)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => MovieDto)
  async deleteMovie(
    @Args('Delete') deleteMovieInput: DeleteMovieInput,
  ): Promise<Movie> {
    return this.movieServices.deleteMovie(deleteMovieInput.MovieId);
  }
}
