import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType()
export class MovieDto {
  @Field({ nullable: true })
  @ApiProperty({
    type: Number,
    description: 'title of movie',
    default: '',
  })
  id: number;
  @Field({ nullable: true })
  @ApiProperty({
    type: String,
    description: 'title of movie',
    default: '',
  })
  title: string;

  @Field({ nullable: true })
  @ApiProperty({
    type: String,
    description: 'title of cover Photo',
    default: '',
  })
  coverPhoto: string;

  @Field({ nullable: true })
  @ApiProperty({
    type: String,
    description: 'movie trailer link ',
    default: '',
  })
  trailer: string;

  @Field({ nullable: true })
  @ApiProperty({
    type: String,
    description: 'movie description',
    default: '',
  })
  description: string;

  @Field({ nullable: true })
  @ApiProperty({
    type: Number,
    description: 'movie production house',
    default: '',
  })
  ProductionHouseId: number;

  @Field(() => [Number], { nullable: true })
  @ApiProperty({
    type: Number,
    description: 'movie actors',
    default: '',
  })
  actors: number[];

  @Field(() => [Number], { nullable: true })
  @ApiProperty({
    type: String,
    description: 'movie directors',
    default: '',
  })
  directors: number[];

  @Field(() => [Number], { nullable: true })
  @ApiProperty({
    type: Number,
    description: 'movie genres',
    default: '',
  })
  genres: number[];

  @Field({ nullable: true })
  userId: number;
}
