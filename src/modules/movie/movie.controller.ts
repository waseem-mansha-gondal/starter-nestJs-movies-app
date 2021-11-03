import {
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter, MovieService } from './movie.service';
import { hasRoles } from '../auth/decorators/roles.decorators';
import { JwtAuthGuard } from '../auth/guards/jwt-guards';
import { RolesGuard } from '../auth/guards/roles-guards';
import { Role } from '../roles.enum';
import { MovieDto } from './movieDto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileUploadDto } from './fileuploaddto';
//---------------------------------------------------------------------//
@ApiBearerAuth()
@ApiTags('movie')
@Controller('movie')
export class MovieController {
  constructor(private movieServices: MovieService) {}
  @hasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('add')
  @ApiCreatedResponse({
    description: 'the resource created successfully ',
  })
  @ApiForbiddenResponse({ description: 'forbidden' })
  @ApiBody({ type: MovieDto })
  async Add(@Request() req) {
    console.log(req.body);
    const obj: MovieDto = req.body;

    obj.userId = req.user.id;
    return await this.movieServices.create(obj);
  }

  @Get()
  @ApiOkResponse({
    description: 'the resource list has been successfully return',
  })
  @ApiForbiddenResponse({ description: 'forbidden' })
  async get(@Request() req) {
    return await this.movieServices.findAllMovies(req);
  }

  @Get('title/:title')
  @ApiOkResponse({
    description: 'the resource list has been successfully return',
  })
  @ApiForbiddenResponse({ description: 'forbidden' })
  async getByTiTle(@Param('title') title: string) {
    return await this.movieServices.findOneByTitle(title);
  }

  @Get('search')
  @ApiOkResponse({
    description: 'the resource list has been successfully return',
  })
  @ApiForbiddenResponse({ description: 'forbidden' })
  async search(@Request() req) {
    //console.log(req.query);
    return this.movieServices.search(req);
  }
  @Get(':id')
  @ApiOkResponse({
    description: 'the resource list has been successfully return',
  })
  @ApiForbiddenResponse({ description: 'forbidden' })
  async getById(@Param('id') id: number) {
    return await this.movieServices.findOneById(id);
  }
  @hasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @ApiOkResponse({
    description: 'the resource list has been successfully return',
  })
  @ApiForbiddenResponse({ description: 'forbidden' })
  async deleteById(@Param('id') id: number) {
    return await this.movieServices.deleteMovie(id);
  }
  @hasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  @ApiCreatedResponse({
    description: 'the resource created successfully ',
  })
  @ApiForbiddenResponse({ description: 'forbidden' })
  async update(@Param('id') id: number, @Request() req) {
    const obj: MovieDto = req.body;
    obj.userId = req.user.id;
    return await this.movieServices.update(id, obj);
  }

  @hasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('coverPhoto/:id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './src/uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'coverPhoto',
    type: FileUploadDto,
  })
  async uploadedFile(@Param('id') id: number, @UploadedFile() file) {
    console.log('FILE:', file.filename);
    const movie = await this.movieServices.findOneById(id);
    movie.coverPhoto = file.filename;
    await movie.save();
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };

    return response;
  }
}
