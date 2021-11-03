import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType()
export class UserDto {
  @Field({ nullable: true })
  @ApiProperty({
    type: String,
    description: 'name',
    default: '',
  })
  id: number;
  @Field({ nullable: true })
  @ApiProperty({
    type: String,
    description: 'name',
    default: '',
  })
  name: string;

  @Field({ nullable: true })
  @ApiProperty({
    type: String,
    description: 'email',
    default: '',
  })
  email: string;

  @Field({ nullable: true })
  @ApiProperty({
    type: String,
    description: 'password',
    default: '',
  })
  password: string;

  @Field({ nullable: true })
  @ApiProperty({
    type: String,
    description: 'gender',
    default: '',
  })
  gender: string;

  @Field({ nullable: true })
  @ApiProperty({
    type: String,
    description: 'role',
    default: '',
  })
  role: string;
  @Field({ nullable: true })
  accountWith: string;
  @Field({ nullable: true })
  accountId: string;
  @Field({ nullable: true })
  @ApiProperty({
    type: String,
    description: 'name',
    default: '',
  })
  token: string;
  // constructor(
  //   name: string,
  //   email: string,
  //   password: string,
  //   gender: string,
  //   role: string,
  //   accountWith: string,
  //   accountId: string,
  // ) {
  //   this.name = name;
  //   this.email = email;
  //   this.password = password;
  //   this.gender = gender;
  //   this.role = role;
  //   this.accountWith = accountWith;
  //   this.accountId = accountId;
  // }
}
