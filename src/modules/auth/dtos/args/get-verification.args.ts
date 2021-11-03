import { ArgsType, Field } from '@nestjs/graphql';
import { IsArray, IsNotEmpty } from 'class-validator';

@ArgsType()
export class verificationTokenArg {
  @Field(() => String)
  @IsArray()
  token: string;
}
