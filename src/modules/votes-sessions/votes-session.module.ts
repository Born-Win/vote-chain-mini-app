import { Module } from '@nestjs/common';

import { StorageModule } from '@storage/storage.module';
import { VoteOptionModule } from '@vote-options/vote-option.module';
import { VoteRecordModule } from '@vote-records/vote-record.module';
import { VoteSessionRepository } from '@votes-sessions/vote-session.repository';

import { VoteSessionController } from './vote-session.controller';
import { VoteSessionService } from './vote-session.service';
import { UserModule } from '../users/user.module';

@Module({
  imports: [UserModule, StorageModule, VoteOptionModule, VoteRecordModule],
  controllers: [VoteSessionController],
  providers: [VoteSessionService, VoteSessionRepository],
})
export class VoteSessionModule {}
