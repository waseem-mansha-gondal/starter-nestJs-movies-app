import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Genre } from '../genres/genre.entity';
import { Movie } from '../movie/movie.entity';

@Table
export class MovieGenre extends Model<MovieGenre> {
  @ForeignKey(() => Genre)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
  })
  genreID: number;

  @BelongsTo(() => Genre)
  genre: Genre;

  @ForeignKey(() => Movie)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
  })
  movieID: number;
  @BelongsTo(() => Movie)
  Movie: Movie;
}
