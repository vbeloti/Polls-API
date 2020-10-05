import { DbLoadAccountByToken } from '../../../../../data/usecases/account/load-account-token/db-load-account-by-token';
import { LoadAccountByToken } from '../../../../../domain/usecases/account/load-acount-by-token';
import { JwtAdapter } from '../../../../../infra/criptography/jwt-adapter/jwt-adapter';
import { AccountMongoRepository } from '../../../../../infra/db/mongodb/account/account-mongo-repository';
import env from '../../../../config/env';

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  const accountMongoRepository = new AccountMongoRepository();
  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository);
};
