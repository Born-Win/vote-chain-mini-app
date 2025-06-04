import { Controller, Get } from '@nestjs/common';
import { HealthCheckResult } from '@nestjs/terminus';

import { HealthService } from './health.service';

@Controller('health-check')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  getHealth(): Promise<HealthCheckResult> {
    return this.healthService.check();
  }
}
