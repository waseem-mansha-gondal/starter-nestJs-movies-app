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
import { PersonDto } from './personDTO';
import { PersonsService } from './persons.service';

@ApiTags('persons')
@Controller('persons')
export class PersonsController {
  constructor(private personServices: PersonsService) {}

  // @hasRoles(Role.Admin)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('add')
  @ApiBody({ type: PersonDto })
  async Add(@Request() req) {
    const obj: PersonDto = req.body;

    // obj.userId = req.user.id;
    return await this.personServices.create(obj);
  }
  @Get()
  async getAll() {
    return await this.personServices.findAll();
  }
  @Get(':id')
  async getById(@Param() param) {
    return await this.personServices.findOneById(param.id);
  }
  @Get('/email/:email')
  async getByEmail(@Param() param) {
    return await this.personServices.findOneByEmail(param.email);
  }
  @Get('/name/:name')
  async getByName(@Param() param) {
    return await this.personServices.findOneByName(param.name);
  }
  // @hasRoles(Role.Admin)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async deleteById(@Param() param) {
    return await this.personServices.deletePerson(param.id);
  }
}
