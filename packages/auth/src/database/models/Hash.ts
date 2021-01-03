import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const crypt = promisify(scrypt);

export class Password {
  static async hash (password: string) {
    const salt = randomBytes(9).toString('hex');
    const buffer = (await crypt(password, salt, 64)) as Buffer;

    return `${buffer.toString('hex')}.${salt}`;
  }

  static async compare (stored: string, supplied: string) {
    const [ hashed, salt ] = stored.split('.');
    const buffer = (await crypt(supplied, salt, 64)) as Buffer;

    return buffer.toString('hex') === hashed;
  }
}