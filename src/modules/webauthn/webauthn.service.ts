import { generateKeyPairSync } from 'crypto';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

import { Fido2Lib } from 'fido2-lib';

import { Injectable } from '@nestjs/common';

@Injectable()
export class WebauthnService {
  private f2l = new Fido2Lib({
    timeout: 60000,
    rpId: 'your.app.domain',
    rpName: 'My App',
    challengeSize: 64,
    attestation: 'none',
    authenticatorAttachment: 'platform',
    cryptoParams: [-7, -257],
  });

  private privateKeyPem: string;

  private publicKeyPem: string;

  constructor() {
    const keyDir = join(__dirname, '../../keys');
    const privPath = join(keyDir, 'private.pem');
    const pubPath = join(keyDir, 'public.pem');

    if (existsSync(privPath) && existsSync(pubPath)) {
      this.privateKeyPem = readFileSync(privPath, 'utf8');
      this.publicKeyPem = readFileSync(pubPath, 'utf8');
    } else {
      const { privateKey, publicKey } = generateKeyPairSync('ec', {
        namedCurve: 'secp256k1',
        publicKeyEncoding: { type: 'spki', format: 'pem' },
        privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
      });
      this.privateKeyPem = privateKey;
      this.publicKeyPem = publicKey;
    }
  }

  private credentials = new Map<string, any>();

  async generateRegistrationOptions() {
    const opts = await this.f2l.attestationOptions();
    return {
      ...opts,
      challenge: Buffer.from(opts.challenge).toString('base64'),
      excludeCredentials: [],
      publicKey: this.publicKeyPem,
    };
  }

  getPrivateKey(): string {
    return this.privateKeyPem;
  }

  getPublicKey(): string {
    return this.publicKeyPem;
  }

  async verifyRegistration(attestation: any, expectedChallenge: string) {
    return this.f2l.attestationResult(attestation, {
      challenge: expectedChallenge,
      origin: 'http://localhost:3000',
      factor: 'either',
    });
  }

  async generateAuthenticationOptions() {
    const allow = Array.from(this.credentials.keys()).map(id => ({
      type: 'public-key',
      id: Buffer.from(id, 'base64'),
      transports: ['internal', 'usb', 'nfc'],
    }));
    const opts = await this.f2l.assertionOptions();
    return opts;
  }

  async getStoredCredential(credIdB64: string) {
    return this.credentials.get(credIdB64);
  }

  async updateCounter(credIdB64: string, authenticatorData: Buffer) {
    const cred = this.credentials.get(credIdB64);
    const counter = authenticatorData.readUInt32BE(33);
    cred.prevCounter = counter;
  }
}
