import { profile } from 'node:console';
import {
  Table,
  Column,
  Model,
  DataType,
  BeforeUpdate,
  BeforeCreate,
  HasMany,
  HasOne,
} from 'sequelize-typescript';
import { Movie } from '../movie/movie.entity';
import { Profile } from '../profile/profile.entity';
import { Rate } from '../rateing/rate.entity';
import { Review } from '../review/review.entity';
import { Role } from '../roles.enum';

@Table({
  tableName: 'Users',
})
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  password: string;

  @Column({
    type: DataType.ENUM,
    values: ['male', 'female'],
    defaultValue: 'male',
  })
  gender: string;

  @Column({
    type: DataType.ENUM,
    values: [Role.User, Role.Admin],
    defaultValue: 'user',
  })
  role: string;
  @Column({
    type: DataType.STRING,
  })
  accountWith: string;

  @Column({
    type: DataType.STRING,
  })
  accountId: string;
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  active: boolean;

  @Column({
    type: DataType.STRING,
  })
  validateToken: string;
  @Column({
    type: DataType.BIGINT,
  })
  validationTokenExpire: number;

  @HasOne(() => Movie, { onDelete: 'CASCADE' })
  Movie: Movie;
  @HasOne(() => Profile, { onDelete: 'CASCADE' })
  Profile: Profile;
  @HasMany(() => Rate, { onDelete: 'CASCADE' })
  Rate: Rate;
  @HasMany(() => Review, { onDelete: 'CASCADE' })
  Review: Review;
  @BeforeCreate
  @BeforeUpdate
  static emailToLowerCase(instance: User) {
    instance.email = instance.email.toLowerCase();
  }
}
