import { Injectable } from '@nestjs/common';

import { StorageService } from '@storage/storage.service';

@Injectable()
export class VoteRecordRepository {
  private readonly repositoryName = 'vote_records';

  constructor(private readonly storage: StorageService) {}

  createOne(data: any) {
    this.storage.set(this.repositoryName, data);
  }

  getByOwner(ownerFp: string) {
    const data = this.storage.get(this.repositoryName);
    return data.filter((d: any) => d.voter_fp === ownerFp);
  }
}
