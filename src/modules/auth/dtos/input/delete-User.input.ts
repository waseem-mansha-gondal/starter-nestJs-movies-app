import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class DeleteUserInput {
  @Field()
  @IsNotEmpty()
  UserId: number;
}
