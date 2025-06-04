import { Module } from '@nestjs/common';

import { CoreModule } from '@core/core.module';

import { StorageModule } from '@storage/storage.module';
import { VoteOptionModule } from '@vote-options/vote-option.module';
import { VoteRecordModule } from '@vote-records/vote-record.module';
import { VoteSessionModule } from '@votes-sessions/votes-session.module';
import { WebauthnModule } from '@webauthn/webauthn.module';

@Module({
  imports: [
    CoreModule,
    WebauthnModule,
    StorageModule,
    VoteSessionModule,
    VoteOptionModule,
    VoteRecordModule,
  ],
})
export class AppModule {}
