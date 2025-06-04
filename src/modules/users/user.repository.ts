import { Injectable } from '@nestjs/common';

import { getPublicKeyFingerprint } from '@common/utils';

import { StorageService } from '@storage/storage.service';

import { UserCreateDto } from './dto';

// import { AuthMapper } from './auth.mapper';
// import { CreateUserGadgetTokenDto } from '../../dto/create-user-gadget-token.dto';
// import { UserGadgetTokenDto } from '../../dto/user-gadget-token.dto';
// import { IAuthRepository } from '../../interfaces/auth-repository.interface';

@Injectable()
export class UserRepository {
  constructor(private readonly storage: StorageService) {}

  create(createDto: UserCreateDto): any {
    const users = this.storage.get('users');
    const user = users.find((u: any) => u.public_key === createDto.public_key);

    if (!user) {
      this.storage.set('users', {
        ...createDto,
        public_key_fp: getPublicKeyFingerprint(createDto.public_key),
        created_at: new Date(),
      });
    }
  }
}
