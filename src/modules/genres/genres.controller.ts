import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { hasRoles } from '../auth/decorators/roles.decorators';
import { JwtAuthGuard } from '../auth/guards/jwt-guards';
import { RolesGuard } from '../auth/guards/roles-guards';
import { Role } from '../roles.enum';
import { GenreDto } from './genre.dto';
import { GenresService } from './genres.service';

@ApiTags('genres')
@Controller('genres')
export class GenresController {
  constructor(private genresService: GenresService) {}

  @hasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('add')
  @ApiBody({ type: GenreDto })
  async Add(@Request() req) {
    const obj: GenreDto = req.body;
    obj.userId = req.user.id;
    return await this.genresService.create(obj);
  }
  @Get()
  async getAll() {
    return await this.genresService.findAll();
  }
  @Get(':id')
  async getById(@Param() param) {
    return await this.genresService.findOneById(param.id);
  }

  // @hasRoles(Role.Admin)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async deleteById(@Param() param) {
    return await this.genresService.deletePerson(param.id);
  }
}
