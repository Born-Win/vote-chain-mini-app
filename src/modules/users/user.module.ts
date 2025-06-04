import { Module } from '@nestjs/common';

import { StorageModule } from '@storage/storage.module';

import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [StorageModule],
  providers: [UserRepository, UserService],
  exports: [UserService],
})
export class UserModule {}
