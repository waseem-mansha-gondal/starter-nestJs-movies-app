import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/user.entity';

@Table
export class Profile extends Model<Profile> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
    allowNull: false,
  })
  userId: number;
  @Column({
    type: DataType.STRING,
  })
  profilePicture: string;

  @BelongsTo(() => User)
  User: User;
}
