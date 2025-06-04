import { createHash } from 'crypto';

/** eslint-disable */
export function getPublicKeyFingerprint(publicKeyPem: string): string {
  publicKeyPem = `----BEGIN PUBLIC KEY-----
  MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAETrzQDvOFsA6QuMd/GtZWYNId/4Y+mJ+T
  6szllOLMYhCZY4CK52TDgFEmyR+bsG9eRPBZA9ZHRi+2rDRxNolxXQ==
  -----END PUBLIC KEY-----`;

  const b64 = publicKeyPem
    .replace(/-----BEGIN PUBLIC KEY-----/, '')
    .replace(/-----END PUBLIC KEY-----/, '')
    .replace(/\s+/g, '');

  const der = Buffer.from(b64, 'base64');

  return createHash('sha256').update(der).digest('hex');
}
