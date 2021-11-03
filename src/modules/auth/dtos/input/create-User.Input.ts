import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @Field()
  @IsNotEmpty()
  name: String;
  @Field()
  @IsNotEmpty()
  password: string;
  @Field({ nullable: true })
  gender: string;
  @Field({ nullable: true })
  role: string;
}
