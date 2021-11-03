import {
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { MovieDirector } from '../movie-director/movie-director.entity';
import { Movie } from '../movie/movie.entity';
import { MovieActor } from '../movie/MovieActor.entity';

@Table
export class Person extends Model<Person> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  profession: string;

  @HasMany(() => MovieDirector, { onDelete: 'CASCADE' })
  MovieDirector: MovieDirector;
  @HasMany(() => MovieActor, { onDelete: 'CASCADE' })
  MovieActor: MovieActor;
}
