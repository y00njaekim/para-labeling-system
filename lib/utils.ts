import { type ClassValue, clsx } from 'clsx';
import { KJUR } from 'jsrsasign';
import Cookies from 'js-cookie';
import { twMerge } from 'tailwind-merge';
import crypto from 'crypto';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const shuffle = (array: any[]) => {
  const length = array.length;
  for (let i = length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const hashing = (input: string) => {
  let hashKey = 'scilabparalabelsystem';
  const hmac = crypto.createHmac('sha256', hashKey);
  hmac.update(input);
  const ret = hmac.digest('hex');
  return ret;
};

export const createAndStoreToken = (participantNum: string) => {
  const secretKey = 'scilabparalabelsystem';
  const tokenPayload = {
    'participantNum': participantNum,
  };

  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  const token = KJUR.jws.JWS.sign(null, header, tokenPayload, secretKey);
  Cookies.set('authToken', token, { expires: 1 });
};

export const decodeToken = (token: string): string => {
  const secretKey = 'scilabparalabelsystem';
  const tokenPayload = KJUR.jws.JWS.parse(token).payloadObj as { 'participantNum': string };
  
  if (KJUR.jws.JWS.verify(token, secretKey)) {
    return tokenPayload.participantNum;
  } else {
    throw new Error('Invalid token');
  }
};
