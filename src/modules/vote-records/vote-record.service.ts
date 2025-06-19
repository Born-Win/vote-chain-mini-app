import { v4 } from 'uuid';

import { Injectable } from '@nestjs/common';

import { getPublicKeyFingerprint } from '@common/utils';

import { VoteRecordRepository } from './vote-record.repository';
import { VoteOptionRepository } from '@vote-options/vote-option.repository';

@Injectable()
export class VoteRecordService {
  constructor(
    private readonly voteRecordRepository: VoteRecordRepository,
    private readonly voteOptionRepository: VoteOptionRepository
  ) {}

  createRecord(publicKey: string, data: any) {
    const publicKeyFp = getPublicKeyFingerprint(publicKey);

    const record = {
      id: v4(),
      session_id: data.session_id,
      voter_fp: publicKeyFp,
      option_id: data.option_id,
      signature: '',
      voted_at: new Date().toISOString(),
      tx_hash: v4(),
    };

    this.voteRecordRepository.createOne(record);

    this.voteOptionRepository.increaseCount(data.option_id);

    return record.tx_hash;
  }
}
