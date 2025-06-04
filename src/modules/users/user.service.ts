import { Injectable } from '@nestjs/common';

import { UserCreateDto } from './dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(user: UserCreateDto) {
    this.userRepository.create(user);
  }
}
