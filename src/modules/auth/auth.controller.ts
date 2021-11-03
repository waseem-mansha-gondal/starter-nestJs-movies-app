import {
  Controller,
  Body,
  Post,
  UseGuards,
  Request,
  Get,
  Req,
  HttpStatus,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';
import { JwtAuthGuard } from './guards/jwt-guards';
import { hasRoles } from './decorators/roles.decorators';
import { RolesGuard } from './guards/roles-guards';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../roles.enum';
import {
  ApiBasicAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginDto } from './login.dto';
import { localAuthGuard } from './guards/local-guard';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService, // public let array=['admin','user']
  ) {}

  @UseGuards(localAuthGuard)
  @Post('login')
  @ApiCreatedResponse({
    description: 'the resource created successfully ',
  })
  @ApiForbiddenResponse({ description: 'forbidden' })
  @ApiBody({ type: LoginDto })
  async login(@Request() req) {
    console.log(req);
    return await this.authService.login(req.user);
  }

  @Post('signup')
  @ApiCreatedResponse({
    description: 'the resource created successfully ',
  })
  @ApiForbiddenResponse({ description: 'forbidden' })
  @ApiBody({ type: UserDto })
  async signUp(@Request() req) {
    return await this.authService.create(req.body);
  }

  @Get('signup/verification/:token')
  @ApiOkResponse({
    description: 'the resource list has been successfully return',
  })
  @ApiForbiddenResponse({ description: 'forbidden' })
  async verification(@Param('token') token: string) {
    return await this.authService.verification(token);
  }
  // let array=['user','admin'];
  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles(Role.Admin)
  @Get('users')
  async getUsers(@Request() req) {
    console.log(req.user);

    return await this.authService.getUsers();
  }
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req);
  }
  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }
  @Get('/facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Req() req: any): Promise<any> {
    return this.authService.faceBookLogin(req);
  }
}
