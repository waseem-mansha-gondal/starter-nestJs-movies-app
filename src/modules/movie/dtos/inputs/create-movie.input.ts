import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateMovieInput {
  @Field()
  @IsNotEmpty()
  title: string;
  @Field()
  @IsNotEmpty()
  trailer: String;
  @Field()
  @IsNotEmpty()
  coverPhoto: string;
  @Field({ nullable: true })
  description: string;
  @Field({ nullable: true })
  UserId: number;
  @Field({ nullable: true })
  ProductionHouseId: number;
  @Field(() => [Number], { nullable: true })
  actors: number[];
  @Field(() => [Number], { nullable: true })
  directors: number[];
  @Field(() => [Number], { nullable: true })
  genres: number[];
}
