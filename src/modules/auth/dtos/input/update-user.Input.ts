import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field()
  @IsNotEmpty()
  UserId: number;

  @Field({ nullable: true })
  @IsOptional()
  name?: string;
  @Field({ nullable: true })
  @IsOptional()
  password?: string;
  @Field({ nullable: true })
  @IsOptional()
  gender?: string;
}
