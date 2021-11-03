import { UseGuards } from '@nestjs/common';
import {
  Args,
  ArgsType,
  Context,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import passport from 'passport';
import { Role } from '../roles.enum';
import { UserDto } from '../users/dto/user.dto';
import { User } from '../users/user.entity';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import { hasRoles } from './decorators/roles.decorators';
import { GetUserArgs } from './dtos/args/get-user.args';
import { GetUsersArgs } from './dtos/args/get-users.args';
import { verificationTokenArg } from './dtos/args/get-verification.args';
import { loginUsersArgs } from './dtos/args/login.args';
import { CreateUserInput } from './dtos/input/create-User.Input';
import { DeleteUserInput } from './dtos/input/delete-User.input';
import { UpdateUserInput } from './dtos/input/update-user.Input';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { JwtAuthGuard } from './guards/jwt-guards';
import { localAuthGuard } from './guards/local-guard';
import { RolesGuard } from './guards/roles-guards';

@Resolver('Users')
export class AuthResolver {
  constructor(private readonly authServices: AuthService) {}

  @hasRoles(Role.Admin)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Query(() => [UserDto])
  async getAllUser(@CurrentUser() user: User) {
    // console.log(user);
    return await this.authServices.getUsers();
  }

  // @Query()
  // async getAllUsers(@Context('users') user: UserDto[]) {
  //   return await this.authServices.getUsers();
  // }
  @Query(() => UserDto)
  @UseGuards(AuthGuard('local'))
  async loginUser(@Args() login: loginUsersArgs, @Context('user') user) {
    // passport.authenticate('local');
    console.log(user);
    return await this.authServices.login(user);
  }

  @Query(() => UserDto)
  async getVerification(@Args() verificationToken: verificationTokenArg) {
    return await this.authServices.verification(verificationToken.token);
  }

  @Mutation(() => UserDto)
  async creatUser(@Args('SingUp') crateUserData: CreateUserInput) {
    return this.authServices.create(crateUserData);
  }

  @Mutation(() => UserDto)
  async updateUser(@Args('Update') crateUserData: UpdateUserInput) {
    return this.authServices.updateUser(crateUserData, crateUserData.UserId);
  }

  @Mutation(() => UserDto)
  async deleteUser(@Args('deleteUser') DeleteUserData: DeleteUserInput) {
    return this.authServices.deleteUser(DeleteUserData);
  }
}
