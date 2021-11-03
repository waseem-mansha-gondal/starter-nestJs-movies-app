import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class UpdateMovieInput {
  @Field()
  @IsNotEmpty()
  MovieId: number;
  @Field({ nullable: true })
  @IsOptional()
  title?: string;
  @Field({ nullable: true })
  @IsOptional()
  trailer?: string;
  @Field({ nullable: true })
  @IsOptional()
  coverPhoto?: string;
  @Field({ nullable: true })
  @IsOptional()
  description?: string;
  @Field({ nullable: true })
  UserId?: number;
  @Field({ nullable: true })
  @IsOptional()
  ProductionHouseId?: number;
}
