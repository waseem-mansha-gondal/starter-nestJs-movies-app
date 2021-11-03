import { Field } from '@nestjs/graphql';

export class GenreDto {
  @Field({ nullable: true })
  readonly name: string;
  @Field({ nullable: true })
  readonly description: string;
  @Field({ nullable: true })
  userId: number;
}
