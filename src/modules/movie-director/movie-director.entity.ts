import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Movie } from '../movie/movie.entity';
import { Person } from '../persons/persons.entity';

@Table
export class MovieDirector extends Model<MovieDirector> {
  @ForeignKey(() => Person)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
  })
  directorID: number;

  @BelongsTo(() => Person)
  Person: Person;

  @ForeignKey(() => Movie)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
  })
  movieID: number;
  @BelongsTo(() => Movie)
  Movie: Movie;
}
