import { Response } from 'express';

import { Controller, Post, Body, UseGuards, Headers } from '@nestjs/common';

import { ApiAuthGuard } from '@common/guards/api-auth.guard';

import { VoteRecordService } from './vote-record.service';

@Controller('vote-records')
export class VoteRecordController {
  constructor(private readonly voteRecordService: VoteRecordService) {}

  @UseGuards(ApiAuthGuard)
  @Post()
  create(@Headers('publicKey') publicKey: string, @Body() data: any): any {
    return this.voteRecordService.createRecord(publicKey, data);
  }
}
