import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  NotNull,
  BelongsTo,
  BelongsToMany,
  HasMany,
  HasOne,
  PrimaryKey,
} from 'sequelize-typescript';
import { MovieDirector } from '../movie-director/movie-director.entity';
import { MovieGenre } from '../movie-genres/movie_genre.entity';
import { Person } from '../persons/persons.entity';
import { ProductionHouse } from '../production-house/production-house.entity';
import { Rate } from '../rateing/rate.entity';
import { Review } from '../review/review.entity';
import { User } from '../users/user.entity';
import { MovieActor } from './MovieActor.entity';

@Table
export class Movie extends Model<Movie> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  coverPhoto: string;
  @Column({
    type: DataType.TEXT,
  })
  trailer: string;
  @Column({
    type: DataType.TEXT,
  })
  description: string;
  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  averageRating: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  paid: boolean;
  @Column({
    type: DataType.INTEGER,
  })
  price: number;
  @ForeignKey(() => ProductionHouse)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  ProductionHouseId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  userId: User;

  @BelongsTo(() => User)
  User: User;
  @HasMany(() => Rate, { onDelete: 'CASCADE' })
  Rate: Rate;
  @HasMany(() => Review, { onDelete: 'CASCADE' })
  Review: Review;
  @BelongsTo(() => ProductionHouse)
  ProductionHouse: ProductionHouse;

  @HasMany(() => MovieActor, { onDelete: 'CASCADE' })
  MovieActor: MovieActor;

  @HasMany(() => MovieDirector, { onDelete: 'CASCADE' })
  MovieDirector: MovieDirector;

  @HasMany(() => MovieGenre, { onDelete: 'CASCADE' })
  MovieGenre: MovieGenre;
}
