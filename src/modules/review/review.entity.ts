import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Movie } from '../movie/movie.entity';
import { User } from '../users/user.entity';

@Table
export class Review extends Model<Review> {
  @Column({
    type: DataType.TEXT,
  })
  review: string;

  @ForeignKey(() => Movie)
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
  })
  movieID: number;

  @BelongsTo(() => Movie)
  movie: Movie;

  @ForeignKey(() => User)
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
  })
  userID: number;

  @BelongsTo(() => User)
  user: User;
}
