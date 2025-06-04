import { Prisma, PrismaClient } from '@prisma/client';

import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

import { Logger } from '@common/logger';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel>
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'error' },
        { emit: 'event', level: 'info' },
        { emit: 'event', level: 'warn' },
      ],
    });

    this.registerLogging();
  }

  async onModuleInit(): Promise<void> {
    await this.connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.disconnect();
  }

  private registerLogging(): void {
    this.$on('error', logEvent => this.logger.error(logEvent.message));
    this.$on('warn', logEvent => this.logger.warn(logEvent.message));
    this.$on('info', logEvent => this.logger.debug(logEvent.message));
    this.$on('query', queryEvent =>
      this.logger.verbose(
        `[${queryEvent.duration} ms] ${queryEvent.query}; ${queryEvent.params}`,
      ),
    );
  }

  private async connect(): Promise<void> {
    try {
      await this.$connect();
      this.logger.log('Prisma connected successfully.');
    } catch (error) {
      this.logger.error('Prisma connection error:', error);
      throw error;
    }
  }

  private async disconnect(): Promise<void> {
    try {
      await this.$disconnect();
      this.logger.log('Prisma disconnected successfully.');
    } catch (error) {
      this.logger.error('Prisma disconnection error:', error);
      throw error;
    }
  }
}
