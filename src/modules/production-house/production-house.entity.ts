import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  HasMany,
  BelongsTo,
} from 'sequelize-typescript';
import { Movie } from '../movie/movie.entity';

@Table
export class ProductionHouse extends Model<ProductionHouse> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
  })
  address: string;

  @HasMany(() => Movie)
  Movie: Movie;
}
