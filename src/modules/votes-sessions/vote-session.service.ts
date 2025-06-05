import { ForbiddenException, Injectable } from '@nestjs/common';

import { getPublicKeyFingerprint } from '@common/utils';

import { VoteOptionRepository } from '@vote-options/vote-option.repository';
import { VoteRecordRepository } from '@vote-records/vote-record.repository';
import { VoteSessionRepository } from '@votes-sessions/vote-session.repository';

@Injectable()
export class VoteSessionService {
  constructor(
    private readonly voteSessionRepository: VoteSessionRepository,
    private readonly voteOptionRepository: VoteOptionRepository,
    private readonly voteRecordRepository: VoteRecordRepository,
  ) {}

  getActiveByUser(publicKey: string) {
    const publicKeyFp = getPublicKeyFingerprint(publicKey);
    return this.voteSessionRepository.getByPublicFp(publicKeyFp);
  }

  getMyVotes(publicKey: string) {
    try {
      const publicKeyFp = getPublicKeyFingerprint(publicKey);
      const created = this.voteSessionRepository.getByPublicFp(publicKeyFp);
      const participated = this.voteRecordRepository.getByOwner(publicKeyFp);
      const sessions: any[] = [];
      participated.forEach((s: any) => {
        const session = this.voteSessionRepository.getById(s.session_id);
        sessions.push({
          ...session.session,
          tx_hash: s.tx_hash,
        });
      });
      return {
        created,
        participated: sessions,
      };
    } catch (err) {
      throw err;
    }
  }

  getById(id: string) {
    const data = this.voteSessionRepository.getById(id);
    if (data.session.status !== 'active') {
      throw new ForbiddenException('Vote already is not available');
    }

    return data;
  }

  createVoteSession(data: any) {
    const voteId = this.voteSessionRepository.createOne(data);
    this.voteOptionRepository.create(data.options, voteId);

    return {
      id: voteId,
    };
  }
}
