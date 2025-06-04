import { Request } from 'express';

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const authorization = request.get('authorization');

    if (!authorization) {
      throw new UnauthorizedException();
    }

    const [name, accessToken] = authorization.split(' ');
    if (name !== 'Bearer' || !accessToken) {
      throw new UnauthorizedException();
    }

    try {
      await this.jwtService.verify(accessToken);
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
