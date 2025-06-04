import { Module } from '@nestjs/common';

import { StorageModule } from '@storage/storage.module';
import { VoteRecordController } from '@vote-records/vote-record.controller';
import { VoteRecordRepository } from '@vote-records/vote-record.repository';
import { VoteRecordService } from '@vote-records/vote-record.service';

import { UserModule } from '../users/user.module';

@Module({
  imports: [StorageModule, UserModule],
  controllers: [VoteRecordController],
  providers: [VoteRecordService, VoteRecordRepository],
  exports: [VoteRecordRepository],
})
export class VoteRecordModule {}
