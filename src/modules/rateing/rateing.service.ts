import { HttpException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Op } from 'sequelize';
import { RATE_REPOSITORY } from 'src/core/constants';
import { Movie } from '../movie/movie.entity';
import { MovieService } from '../movie/movie.service';
import { User } from '../users/user.entity';
import { Rate } from './rate.entity';

@Injectable()
export class RatingService {
  constructor(
    private jwtService: JwtService,
    @Inject(RATE_REPOSITORY) private readonly rateRepository: typeof Rate,
    private movieServices: MovieService,
  ) {}
  async rateAMovie(req: any) {
    console.log(req.headers.authorization);
    const rawToken = req.headers.authorization;
    const token = rawToken.split('Bearer ')[1];
    console.log(token);
    const json: any = this.jwtService.decode(token);
    console.log(json.id);

    const rate = {
      userID: json.id,
      movieID: req.body.movieID,
      rate: req.body.rate,
    };
    if (req.body.rate > 5 || req.body.rate < 1) {
      throw new HttpException('rate should be in between 1-5', 404);
    }
    const check = await this.rateRepository.findAll({
      where: { [Op.and]: [{ userID: json.id }, { movieID: req.body.movieID }] },
    });
    const newRate = await this.rateRepository.create(rate as Rate);
    console.log(newRate);
    const moviesRate = await this.rateAMovieByAMovie(rate.movieID);
    const avgRate = await this.movieServices.averageRating(
      moviesRate,
      rate.movieID,
    );
  }

  async rateAMovieByAUser(userID: number) {
    return await this.rateRepository.findAll({
      where: { userID },
      include: [
        {
          model: Movie,
        },
        { model: User },
      ],
    });
  }

  async rateAMovieByAMovie(movieID: number) {
    return await this.rateRepository.findAll({
      where: { movieID },
      include: [
        {
          model: Movie,
        },
        { model: User },
      ],
    });
  }
  // find if user exist with this email
}
