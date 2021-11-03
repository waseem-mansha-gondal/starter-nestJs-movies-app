import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Request,
  Get,
  Patch,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-guards';
import {
  editFileName,
  imageFileFilter,
  ProfileService,
} from './profile.service';
import { diskStorage } from 'multer';
import { User } from '../users/user.entity';
import { of } from 'rxjs';
import { join } from 'path';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('profile')
@Controller('auth/user/profile')
export class ProfileController {
  constructor(private profileServices: ProfileService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async createProfile(@Request() req) {
    return await this.profileServices.creatProfile(req);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profilePic')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@Request() req, @UploadedFile() file) {
    // const user = await User.findOne({where:{id:req.user.id}})
    const user = req.user.id;
    const profile = await this.profileServices.getProfileOfUser(user);
    profile.profilePicture = file.filename;
    await profile.save();
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };

    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getProfile(@Request() req) {
    const profile = await this.profileServices.getProfileOfUser(req.user.id);

    return profile['dataValues'];
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateProfile(@Request() req) {
    return await this.profileServices.updateProfile(req.body, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profilePicture')
  async getProfileImage(@Res() res, @Request() req) {
    const profile = await this.profileServices.getProfileOfUser(req.user.id);

    return of(
      res.sendFile(join(process.cwd(), 'uploads/' + profile.profilePicture)),
    );
  }
}
