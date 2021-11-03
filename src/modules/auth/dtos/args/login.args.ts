import { ArgsType, Field } from '@nestjs/graphql';
import { IsArray, IsNotEmpty } from 'class-validator';

@ArgsType()
export class loginUsersArgs {
  @Field(() => String)
  @IsArray()
  email: string;

  @Field(() => String)
  @IsArray()
  password: string;
}
