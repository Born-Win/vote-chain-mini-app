import { Request } from 'express';

import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

import { UserService } from 'src/modules/users/user.service';

@Injectable()
export class ApiAuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    const publicKeyHeader = 'publicKey';

    let publicKey = request.get(publicKeyHeader);

    if (!publicKey) {
      throw new BadRequestException(`There is no ${publicKeyHeader} header`);
    }

    publicKey = `----BEGIN PUBLIC KEY-----
MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAETrzQDvOFsA6QuMd/GtZWYNId/4Y+mJ+T
6szllOLMYhCZY4CK52TDgFEmyR+bsG9eRPBZA9ZHRi+2rDRxNolxXQ==
-----END PUBLIC KEY-----`;

    this.userService.create({
      public_key: publicKey,
    });

    return true;
  }
}
