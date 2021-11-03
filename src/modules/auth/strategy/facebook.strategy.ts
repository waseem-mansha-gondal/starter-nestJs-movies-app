import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';
import { UserDto } from 'src/modules/users/dto/user.dto';
import { User } from 'src/modules/users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';
import { SocialUserDto } from 'src/modules/users/dto/SocialUserDto';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {
    super({
      clientID: process.env.APP_ID,
      clientSecret: process.env.APP_SECRET,
      callbackURL: 'http://localhost:3000/api/v1/auth/facebook/redirect',
      scope: 'email',
      profileFields: ['emails', 'name'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    //console.log(profile);
    const { id, name, emails } = profile;
    const user = {
      email: emails[0].value,
      name: name.givenName,
      accountId: id,
    };
    let userCreat = new SocialUserDto();

    const payload = {
      user,
      accessToken,
    };
    // console.log(user.firstName + ' ' + user.lastName);
    userCreat.name = user.name;

    userCreat.email = user.email;
    userCreat.accountWith = 'facebook';
    userCreat.accountId = user.accountId;
    console.log(userCreat);
    const userDone = await this.userService.createBySocial(userCreat);
    const { password, ...result } = userDone['dataValues'];

    const token = await this.generateToken(result);
    return done(null, userDone, token);
  }

  private async generateToken(user) {
    const token = await this.jwtService.signAsync(user);
    return token;
  }
}
