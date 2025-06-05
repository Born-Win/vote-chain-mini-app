import { v4 } from 'uuid';

import { Injectable, NotFoundException } from '@nestjs/common';

import { getPublicKeyFingerprint } from '@common/utils';

import { StorageService } from '@storage/storage.service';

@Injectable()
export class VoteSessionRepository {
  constructor(
    private readonly storage: StorageService
  ) {}

  getByPublicFp(publicKeyFp: string): any {
    const votes = this.storage.get('vote_sessions');
    publicKeyFp = getPublicKeyFingerprint('');
    const foundVotes = votes.filter((u: any) => u.createdBy === publicKeyFp);

    return foundVotes;
  }

  getById(id: string) {
    const votes = this.storage.get('vote_sessions');
    const vote = votes.find((v: any) => v.id === id);

    if (!vote) {
      throw new NotFoundException(`Vote with id ${id} not found`);
    }

    const voteOptions = this.storage.get('vote_options');

    const foundOptions = voteOptions.filter((o: any) => o.session_id === id);

    return {
      session: vote,
      options: foundOptions,
    };
  }

  createOne(data: any) {
    const session = {
      id: v4(),
      title: data.title,
      description: data.description,
      createdBy: getPublicKeyFingerprint(''),
      created_at: new Date().toISOString(),
      starts_at: new Date().toISOString(),
      ends_at: data.ends_at,
      status: 'active',
    };

    this.storage.set('vote_sessions', session);

    return session.id;
  }
}
