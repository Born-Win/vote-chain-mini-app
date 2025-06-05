import { join } from 'path';

import { Response } from 'express';

import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Res,
  Headers,
  Query,
} from '@nestjs/common';

import { ApiAuthGuard } from '@common/guards/api-auth.guard';

import { VoteSessionService } from './vote-session.service';

@Controller('vote-sessions')
export class VoteSessionController {
  constructor(private readonly voteSessionService: VoteSessionService) {}

  @UseGuards(ApiAuthGuard)
  @Get('all')
  getActive(@Headers('publicKey') publicKey: string): any {
    return this.voteSessionService.getActiveByUser(publicKey);
  }

  @Get()
  getById(@Query('id') id: string) {
    return this.voteSessionService.getById(id);
  }

  @Post()
  createVote(@Body() data: any) {
    return this.voteSessionService.createVoteSession(data);
  }

  @Get('my')
  getMyVotes(@Headers('publicKey') publicKey: string) {
    return this.voteSessionService.getMyVotes(publicKey);
  }

  @Get('create')
  getCreatePage(@Res() res: Response) {
    res.sendFile('create-votes.html', {
      root: join(__dirname, '../../../', 'public'),
      dotfiles: 'allow',
    });
  }

  @Get('myvotes')
  getMyVotesPage(@Res() res: Response) {
    res.sendFile('view-votes.html', {
      root: join(__dirname, '../../../', 'public'),
      dotfiles: 'allow',
    });
  }

  @Get('participate')
  getParticipatePage(@Res() res: Response) {
    res.sendFile('send-vote.html', {
      root: join(__dirname, '../../../', 'public'),
      dotfiles: 'allow',
    });
  }
}
