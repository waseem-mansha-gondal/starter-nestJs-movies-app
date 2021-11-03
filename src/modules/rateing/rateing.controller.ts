import {
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { hasRoles } from '../auth/decorators/roles.decorators';
import { JwtAuthGuard } from '../auth/guards/jwt-guards';
import { RolesGuard } from '../auth/guards/roles-guards';
import { Role } from '../roles.enum';
import { rateDto } from './rate.dto';
import { RatingService } from './rateing.service';

@ApiTags('rating')
@Controller('user/rating')
export class RateingController {
  constructor(private rateServices: RatingService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBody({ type: rateDto })
  async Add(@Request() req) {
    return await this.rateServices.rateAMovie(req);
  }
  @hasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':movieId')
  async getByyMovieId(@Param() param) {
    return await this.rateServices.rateAMovieByAMovie(param.movieId);
  }

  @hasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('user/:userId')
  async getByyUserId(@Param() param) {
    return await this.rateServices.rateAMovieByAUser(param.userId);
  }
}
