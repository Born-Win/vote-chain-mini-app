import { Module } from '@nestjs/common';

import { WebauthnController } from './webauthn.controller';
import { WebauthnService } from './webauthn.service';

@Module({
  controllers: [WebauthnController],
  providers: [WebauthnService],
})
export class WebauthnModule {}
