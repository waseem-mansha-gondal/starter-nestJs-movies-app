/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { config } from 'dotenv';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { SocialUserDto } from 'src/modules/users/dto/SocialUserDto';
import { UserDto } from 'src/modules/users/dto/user.dto';
import { User } from 'src/modules/users/user.entity';
import { UsersService } from 'src/modules/users/users.service';

config();
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {
    super({
      clientID:
        '486603679224-33u2fo7v993c778rqkbddns83uqu5n2l.apps.googleusercontent.com',
      clientSecret: 'D2g-WEWRcQBqnzmQnIvGCCkH',
      callbackURL: 'http://localhost:3000/api/v1/auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accountId: id,
      accessToken,
    };
    const userCreat = new SocialUserDto();
    const payload = {
      user,
      accessToken,
    };
    userCreat.name = user.firstName + ' ' + user.lastName;
    userCreat.email = user.email;
    userCreat.accountWith = 'google';
    userCreat.accountId = user.accountId;
    const userDone: User = await this.userService.createBySocial(userCreat);
    const { password, ...result } = userDone['dataValues'];

    const token = await this.generateToken(result);
    done(null, userDone, token);
  }
  private async generateToken(user) {
    const token = await this.jwtService.signAsync(user);
    return token;
  }
}
