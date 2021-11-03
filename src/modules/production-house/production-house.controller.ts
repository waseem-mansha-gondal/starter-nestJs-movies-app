import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { hasRoles } from '../auth/decorators/roles.decorators';
import { JwtAuthGuard } from '../auth/guards/jwt-guards';
import { RolesGuard } from '../auth/guards/roles-guards';
import { Role } from '../roles.enum';
import { ProductionHouseService } from './production-house.service';
import { ProductionDto } from './ProductionHouse.dto';

@ApiBearerAuth()
@ApiTags('productionHouse')
@Controller('productionhouse')
export class ProductionHouseController {
  constructor(private proHService: ProductionHouseService) {}
  @hasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBody({ type: ProductionDto })
  @Post('add')
  async Add(@Request() req) {
    return await this.proHService.create(req.body);
  }
  @Get()
  async getAll() {
    return await this.proHService.findAll();
  }
  @Get(':id')
  async getById(@Param() param) {
    return await this.proHService.findOneById(param.id);
  }
  @Get('name/:name')
  async getByName(@Param() param) {
    return await this.proHService.findOneByName(param.name);
  }
  // @hasRoles(Role.Admin)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async deleteById(@Param() param) {
    return await this.proHService.deletePerson(param.id);
  }
}
