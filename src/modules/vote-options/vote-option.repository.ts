import { v4 } from 'uuid';

import { Injectable } from '@nestjs/common';

import { StorageService } from '@storage/storage.service';

@Injectable()
export class VoteOptionRepository {
  constructor(private readonly storage: StorageService) {}

  create(data: any, sessionId: string) {
    for (const option of data) {
      const optionData = {
        id: v4(),
        session_id: sessionId,
        label: option,
        vote_count: 0,
      };
      this.storage.set('vote_options', optionData);
    }
  }
}
