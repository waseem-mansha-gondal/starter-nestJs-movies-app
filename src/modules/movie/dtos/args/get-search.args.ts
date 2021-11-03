import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@ArgsType()
export class SearchMovieArgs {
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
