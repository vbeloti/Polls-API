import { Decrypter } from '../protocols/criptography/decrypter';
import { Encrypter } from '../protocols/criptography/encrypter';
import { HashCompare } from '../protocols/criptography/hash-compare';
import { Hasher } from '../protocols/criptography/hasher';

export const mockHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return new Promise(resolve => resolve('any_password'));
    }
  }

  return new HasherStub();
};

export const mockDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<string> {
      return new Promise(resolve => resolve('any_value'));
    }
  }

  return new DecrypterStub();
};

export const mockEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (id: string): Promise<string> {
      return new Promise(resolve => resolve('any_token'));
    }
  }

  return new EncrypterStub();
};

export const mockHashCompare = (): HashCompare => {
  class HashCompareStub implements HashCompare {
    async compare (value: string, hash: string): Promise<boolean> {
      return new Promise(resolve => resolve(true));
    }
  }

  return new HashCompareStub();
};
