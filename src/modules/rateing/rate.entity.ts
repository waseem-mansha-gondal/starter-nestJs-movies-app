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
export class Rate extends Model<Rate> {
  @Column({
    type: DataType.INTEGER,
  })
  rate: number;

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
