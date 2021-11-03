/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { REVIEW_REPOSITORY } from 'src/core/constants';
import { Movie } from '../movie/movie.entity';
import { User } from '../users/user.entity';
import { Review } from './review.entity';

@Injectable()
export class ReviewService {
  constructor(
    private jwtService: JwtService,
    @Inject(REVIEW_REPOSITORY) private readonly reviewRepository: typeof Review,
  ) {}

  async reviewAMovie(req: any) {
    const rawToken = req.headers.authorization;
    const token = rawToken.split('Bearer ')[1];
    console.log(token);
    const json: any = this.jwtService.decode(token);
    console.log(json.id);
    const review = {
      userID: json.id,
      movieID: req.body.movieID,
      rate: req.body.review,
    };
    this.reviewRepository.create((review as unknown) as Review);
  }

  async reviewAMovieByAUser(userID: number) {
    return await this.reviewRepository.findAll({
      where: { userID },
      include: [
        {
          model: Movie,
        },
        { model: User },
      ],
    });
  }

  async reviewAMovieByAMovie(movieID: number) {
    return await this.reviewRepository.findAll({
      where: { movieID },
      include: [
        {
          model: Movie,
        },
        { model: User },
      ],
    });
  }
}
