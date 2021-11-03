import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { MovieGenre } from '../movie-genres/movie_genre.entity';

@Table
export class Genre extends Model<Genre> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @HasMany(() => MovieGenre, { onDelete: 'CASCADE' })
  MovieGenre: MovieGenre;
}
