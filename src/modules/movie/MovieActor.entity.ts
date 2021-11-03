import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Person } from '../persons/persons.entity';
import { Movie } from './movie.entity';

@Table
export class MovieActor extends Model<MovieActor> {
  @ForeignKey(() => Person)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
  })
  actorID: number;

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
