import {
  Injectable,
  Inject,
  HttpException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { USER_REPOSITORY } from '../../core/constants';
import { JwtService } from '@nestjs/jwt';
import { SocialUserDto } from './dto/SocialUserDto';
import { sendEmail } from 'src/utlis/sendMail';
import * as crypto from 'crypto';
import { DATE } from 'sequelize/types';
import { Op } from 'sequelize';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
// import { MovieService } from '../movie/movie.service';

//import { confirmEmail } from 'src/utlis/confirmEmailLink';

@Injectable()
export class UsersService {
  async deleteUser(id: number) {
    return await this.userRepository
      .findOne({
        where: { id },
      })
      .then((result) => {
        return this.userRepository.destroy({ where: { id } }).then((u) => {
          return result;
        });
      });
  }
  // async updateToken(user: any, token: string) {
  //   let userUpdate: User = await this.findOneById(user.id);
  //   userUpdate.token = token;
  //   userUpdate.save();
  //   return userUpdate;
  // }

  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
    private readonly jwtService: JwtService, // private movieServices: MovieService,
  ) {}

  async create(creatUserDTO: UserDto) {
    let user = new User();

    const alreadyInUse = await this.findOneByEmail(creatUserDTO.email);
    if (alreadyInUse) {
      throw new HttpException('Sorry this email is already in use', 404);
    }

    user.name = creatUserDTO.name;
    user.password = creatUserDTO.password;
    user.role = creatUserDTO.role;
    user.accountId = creatUserDTO.accountId;
    user.accountWith = creatUserDTO.accountWith;
    user.email = creatUserDTO.email;
    user.gender = creatUserDTO.gender;
    let userData = await user.save();

    userData.active = false;

    const resetToken = crypto.randomBytes(5).toString('hex');
    userData.validateToken = resetToken;

    userData.validationTokenExpire = Date.now() + 10 * 60 * 1000;
    console.log(userData);
    await userData.save();
    await sendEmail(user.email, resetToken);
    return userData;
  }

  async findOnebyaccountid(accountId: string): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { accountId } });
  }
  async findByVerifyToken(tokenSend: string) {
    const user = await this.userRepository.findOne<User>({
      where: { validateToken: tokenSend },
    });
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    console.log(user);
    const dateNow = Date.now();
    if (user.validationTokenExpire < dateNow) {
      throw new HttpException('Token has been expired Or invalid token', 404);
    }
    user.validateToken = null;
    user.validationTokenExpire = null;
    user.active = true;
    await user.save();
    return user;
  }
  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { email } });
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { id } });
  }
  async findAllUser(): Promise<User[]> {
    return await this.userRepository.findAll<User>();
  }
  async createBySocial(creatUserDTO: SocialUserDto) {
    if (creatUserDTO.accountWith) {
      const userAlreadyExsist = await this.findOnebyaccountid(
        creatUserDTO.accountId,
      );
      if (userAlreadyExsist) {
        return userAlreadyExsist;
      }
    }
    let user = new User();
    user.name = creatUserDTO.name;
    user.accountId = creatUserDTO.accountId;
    user.accountWith = creatUserDTO.accountWith;
    user.email = creatUserDTO.email;
    const userData = await user.save();

    return userData;
  }
  async UpdateUser(id: number, userUpdate: UserDto) {
    const user = await this.findOneById(id);
    if (userUpdate.name != null) {
      user.name = userUpdate.name;
    }
    if (userUpdate.password != null) {
      user.password = userUpdate.password;
      user.active = false;

      const resetToken = crypto.randomBytes(5).toString('hex');
      user.validateToken = resetToken;

      user.validationTokenExpire = Date.now() + 10 * 60 * 1000;
      console.log(user);
      await sendEmail(user.email, resetToken);
    }
    if (userUpdate.gender != null) {
      user.gender = userUpdate.gender;
    }
    if (userUpdate.email != null) {
      user.email = userUpdate.email;
      const resetToken = crypto.randomBytes(5).toString('hex');
      user.validateToken = resetToken;

      user.validationTokenExpire = Date.now() + 10 * 60 * 1000;
      console.log(user);
      await sendEmail(user.email, resetToken);
    }
    await user.save();
    return user;
  }
  async search(req) {
    const data = req.query;
    Object.entries(data).forEach(([key, val]: any) =>
      isNaN(val) ? (data[key] = { [Op.like]: '%' + val + '%' }) : val,
    );
    console.log(data);
    return await this.userRepository.findAndCountAll({
      where: data,
    });
  }
  //   async rateAMovie(obj) {
  //     if (obj.rate > 5 || obj.rate < 1) {
  //       throw new HttpException(
  //         'rate cant be above the 5 and less the 1',
  //         HttpStatus.BAD_REQUEST,
  //       );
  //     }
  //     const newRate = {
  //       rate: obj.rate,
  //       movieID: obj.movieID,
  //       userID: obj.userID,
  //     };
  //   }
  //
}
