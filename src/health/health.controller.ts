import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  SequelizeHealthIndicator,
} from '@nestjs/terminus';
import { Connection } from 'sequelize/types/lib/connection-manager';
import { sequelize } from 'src/core/database/database.providers';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: SequelizeHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
    ]);
  }
  @Get('db')
  @HealthCheck()
  checkDB() {
    // console.log(sequelize);
    return this.health.check([
      async () => await this.db.pingCheck('sequelize'),
    ]);
  }
}
