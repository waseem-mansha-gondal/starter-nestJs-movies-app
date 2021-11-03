import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { UserDto } from '../users/dto/user.dto';
import { DeleteUserInput } from './dtos/input/delete-User.input';

@Injectable()
export class AuthService {
  async deleteUser(deleteUserData: DeleteUserInput) {
    const user = await this.userService.deleteUser(deleteUserData.UserId);
    return user;
  }
  async verification(tokenSend: string) {
    const user = await this.userService.findByVerifyToken(tokenSend);
    console.log(user);
    const {
      password,
      validationTokenExpire,
      accountId,
      accountWith,
      validateToken,
      active,
      createdAt,
      updatedAt,
      ...result
    } = user['dataValues'];
    const token = await this.generateToken(result);

    let result1: UserDto = result;
    result1.token = token;
    console.log(result1);
    return result1;
  }

  async getUsers(): Promise<User[]> {
    const userArray = await this.userService.findAllUser();
    // console.log(userArray);
    return userArray;
  }
  async updateUser(user, id) {
    let pass = user.password;
    if (user.password != null) {
      pass = await this.hashPassword(user.password);
    }
    const newUser = await this.userService.UpdateUser(id, {
      ...user,
      password: pass,
    });

    return newUser;
  }
  faceBookLogin(req: any): any {
    if (!req.user) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        data: null,
      };
    }
    // console.log(req.user);
    return {
      statusCode: HttpStatus.OK,
      data: req.user,
    };
  }
  googleLogin(req: any) {
    if (!req.user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
  getHello(): string {
    return 'Hello World!';
  }
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User | null> {
    // find if user exist with this email
    const user = await this.userService.findOneByEmail(username);
    if (!user) {
      return null;
    }

    // find if user password match
    const match = await this.comparePassword(pass, user.password);
    if (!match) {
      return null;
    }

    // tslint:disable-next-line: no-string-literal
    const { password, ...result } = user['dataValues'];
    return result;
  }

  async login(user) {
    console.log(user);
    let token;
    if (user.active == true) {
      token = await this.generateToken(user);
    } else {
      throw new HttpException(
        'you need to verify your email',
        HttpStatus.BAD_REQUEST,
      );
    }
    // const updatedUser = await this.userService.updateToken(user, token);
    return { user, token };
  }

  public async create(user) {
    // hash the password
    console.log(user);
    const pass = await this.hashPassword(user.password);

    const newUser = await this.userService.create({ ...user, password: pass });

    // tslint:disable-next-line: no-string-literal
    const {
      password,
      validationTokenExpire,
      accountId,
      accountWith,
      validateToken,
      active,
      createdAt,
      updatedAt,
      ...result
    } = newUser['dataValues'];
    console.log(result);
    // generate token
    const result1: UserDto = result;
    // return the user and the token
    return result;
  }

  private async generateToken(user) {
    const token = await this.jwtService.signAsync(user);
    return token;
  }

  private async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  private async comparePassword(enteredPassword, dbPassword) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }
}
