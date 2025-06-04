import { Module } from '@nestjs/common';

import { StorageModule } from '@storage/storage.module';

import { VoteOptionRepository } from './vote-option.repository';

@Module({
  imports: [StorageModule],
  providers: [VoteOptionRepository],
  exports: [VoteOptionRepository],
})
export class VoteOptionModule {}
