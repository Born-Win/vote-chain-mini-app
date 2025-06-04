// webauthn.controller.ts
import { Controller, Post, Body, Get, Session } from '@nestjs/common';

import { WebauthnService } from './webauthn.service';

@Controller('webauthn')
export class WebauthnController {
  constructor(private readonly webauthn: WebauthnService) {}

  @Get('register/options')
  async registerOptions(@Session() session: Record<string, any>) {
    const opts = await this.webauthn.generateRegistrationOptions();
    return opts;
  }

  // @Post('register/verify')
  // async registerVerify(
  //   @Body() body: any,
  //   @Session() session: Record<string, any>,
  // ) {
  //   const { id, rawId, response, type } = body;
  //   const clientResponse = {
  //     id,
  //     rawId: Buffer.from(rawId, 'base64'),
  //     response: {
  //       clientDataJSON: Buffer.from(response.clientDataJSON, 'base64'),
  //       attestationObject: Buffer.from(response.attestationObject, 'base64'),
  //     },
  //     type,
  //   };
  //   const regResult = await this.webauthn.verifyRegistration(
  //     clientResponse,
  //     session.registerChallenge,
  //   );
  //   // Сохраняем credential publicKey и credentialID в БД:
  //   await this.webauthn.storeCredential({
  //     userId: regResult.user.id,
  //     credentialID: regResult.authnrData.get('credId'),
  //     publicKey: regResult.authnrData.get('credentialPublicKeyPem'),
  //   });
  //   return { ok: true };
  // }

  // @Post('auth/options')
  // async authOptions(@Session() session: Record<string, any>) {
  //   const opts = await this.webauthn.generateAuthenticationOptions();
  //   session.authChallenge = opts.publicKey.challenge;
  //   return opts;
  // }

  // @Post('auth/verify')
  // async authVerify(
  //   @Body() body: any,
  //   @Session() session: Record<string, any>,
  // ) {
  //   const { id, rawId, response, type } = body;
  //   const authnResponse = {
  //     id,
  //     rawId: Buffer.from(rawId, 'base64'),
  //     response: {
  //       clientDataJSON: Buffer.from(response.clientDataJSON, 'base64'),
  //       authenticatorData: Buffer.from(response.authenticatorData, 'base64'),
  //       signature: Buffer.from(response.signature, 'base64'),
  //       userHandle: response.userHandle
  //         ? Buffer.from(response.userHandle, 'base64')
  //         : null,
  //     },
  //     type,
  //   };
  //   const dbCred = await this.webauthn.getStoredCredential(id);
  //   await this.webauthn.verifyAuthentication(
  //     authnResponse,
  //     session.authChallenge,
  //     dbCred.publicKey,
  //     dbCred.prevCounter,
  //   );
  //   // Обновляем счетчик в БД
  //   await this.webauthn.updateCounter(id, authnResponse.response.authenticatorData);
  //   return { ok: true };
  // }
}
