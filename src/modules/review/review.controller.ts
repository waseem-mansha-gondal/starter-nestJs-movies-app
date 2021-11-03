import {
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { hasRoles } from '../auth/decorators/roles.decorators';
import { JwtAuthGuard } from '../auth/guards/jwt-guards';
import { RolesGuard } from '../auth/guards/roles-guards';
import { Role } from '../roles.enum';
import { ReviewService } from './review.service';

@ApiTags('review')
@Controller('review')
export class ReviewController {
  constructor(private reviewServices: ReviewService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async Add(@Request() req) {
    return await this.reviewServices.reviewAMovie(req.body);
  }

  @hasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':movieId')
  async getByyMovieId(@Param() param) {
    return await this.reviewServices.reviewAMovieByAMovie(param.movieId);
  }

  @hasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('user/:userId')
  async getByyUserId(@Param() param) {
    return await this.reviewServices.reviewAMovieByAUser(param.userId);
  }
}
