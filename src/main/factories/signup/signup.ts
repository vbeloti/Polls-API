import { SignUpController } from '../../../presentation/controllers/signup/signup';
import { DbAddAccount } from '../../../data/usescases/add-account/db-add-account';
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter';
import { AccountMongoRepository } from '../../../infra/db/mongodb/account-repository/account';
import { Controller } from '../../../presentation/protocols';
import { LogControllerDecorator } from '../../decorators/log';
import { LogMongoRepository } from '../../../infra/db/mongodb/log-repository/log';
import { makeSignUpValidation } from './signup-validation';

export const makeSignUpController = (): Controller => {
  const salt = 12;
  const bcryptAdaper = new BcryptAdapter(salt);
  const accountMongoRepository = new AccountMongoRepository();
  const dbAddAcount = new DbAddAccount(bcryptAdaper, accountMongoRepository);
  const signUpController = new SignUpController(dbAddAcount, makeSignUpValidation());
  const logMongoRepository = new LogMongoRepository();
  return new LogControllerDecorator(signUpController, logMongoRepository);
};
