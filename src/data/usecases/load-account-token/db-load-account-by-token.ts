import { AccountModel } from '../../../domain/models/account';
import { LoadAccountByToken } from '../../../domain/usecases/load-acount-by-token';
import { Decrypter } from '../../protocols/criptography/decrypter';

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (private readonly decrypter: Decrypter) {
    this.decrypter = decrypter;
  }

  async load (accessToken: string, role?: string): Promise<AccountModel> {
    await this.decrypter.decrypt(accessToken);
    return null;
  }
}
