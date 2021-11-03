import { Inject, Injectable } from '@nestjs/common';
import { extname } from 'path';
import { PROFILE_REPOSITORY } from 'src/core/constants';
import { Profile } from './profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @Inject(PROFILE_REPOSITORY) private profileRepository: typeof Profile,
  ) {}

  async creatProfile(req) {
    let profile = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userId: req.user.id,
    };
    const newProfile = await this.profileRepository.create(profile as Profile);

    return newProfile;
  }
  async updateProfile(user, id) {
    const profile = await this.profileRepository.findOne({
      where: { userId: id },
    });

    if (user.firstName != '') {
      profile.firstName = user.firstName;
    }
    if (user.lastName != '') {
      profile.lastName = user.lastName;
    }
    profile.save();
    return profile;
  }
  async getProfile(id) {
    return await this.profileRepository.findOne({ where: { id } });
  }
  async getProfileOfUser(id) {
    console.log(id);
    const profile = await this.profileRepository.findOne({
      where: { userId: id },
    });
    // console.log(profile);
    return profile;
  }
}

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|PNG)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const editFileName = async (req, file, callback) => {
  console.log(req.params.id);
  const user = req.user.name;

  const name = user;
  const fileExtName = extname(file.originalname);

  callback(null, `${name}${fileExtName}`);
};
