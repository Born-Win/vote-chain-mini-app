import { Injectable } from '@nestjs/common';

/**
 * eslint-disable
 */
@Injectable()
export class StorageService {
  private storage: Record<string, any> = {
    users: [],
    vote_sessions: [
      {
        id: '295ed43a-9e36-45b8-8cd5-eb7b339ac036',
        title: 'Office Snack Options',
        description: 'Choose our next office snack',
        createdBy:
          '97dfa4e300c1bd649af8b71a9f5517c92a42941e388074d2c3b0c7a801c38a39',
        created_at: new Date().toISOString(),
        starts_at: new Date().toISOString(),
        ends_at: new Date(Date.now() + 36000).toISOString(),
        status: 'active',
      },
    ],
    vote_options: [
      {
        id: '123456',
        session_id: '295ed43a-9e36-45b8-8cd5-eb7b339ac036',
        option_index: 1,
        label: 'OptionA',
        vote_count: 0,
      },
      {
        id: '654321',
        session_id: '295ed43a-9e36-45b8-8cd5-eb7b339ac036',
        option_index: 2,
        label: 'OptionB',
        vote_count: 0,
      },
    ],
    vote_records: [
      {
        id: '5331090c-43fa-4f17-8f23-ea9801021341',
        session_id: '295ed43a-9e36-45b8-8cd5-eb7b339ac036',
        voter_fp:
          '97dfa4e300c1bd649af8b71a9f5517c92a42941e388074d2c3b0c7a801c38a39',
        option_id: '654321',
        signature: '',
        voted_at: '2025-06-03T15:14:59.711Z',
        tx_hash: '8b66d15e-085f-4c6c-bf57-b6b8ae5410ec',
      },
    ],
  };

  constructor() {}

  set(key: string, data: any) {
    this.storage[key].push(data);
  }

  get(key: string) {
    return this.storage[key];
  }
}
