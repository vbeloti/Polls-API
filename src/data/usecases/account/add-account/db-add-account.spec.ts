import { mockAddAccountRepository, mockHasher } from '@/data/test';
import { mockAccountModel, mockAddAccountParams, throwError } from '@/domain/test';
import { DbAddAccount } from './db-add-account';
import { Hasher, AddAccountParams, AccountModel, AddAccountRepository, LoadAccountByEmailRepository } from './db-add-account-protocols';

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<AccountModel> {
      return new Promise(resolve => resolve(null));
    }
  }

  return new LoadAccountByEmailRepositoryStub();
};

type SutTypes = {
  sut: DbAddAccount;
  hasherStub: Hasher;
  addAccountRepositoryStub: AddAccountRepository;
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository;
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository();
  const hasherStub = mockHasher();
  const addAccountRepositoryStub = mockAddAccountRepository();
  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub, loadAccountByEmailRepositoryStub);

  return {
    sut,
    hasherStub,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub
  };
};

describe('DbAddAcount Usecase', () => {
  test('Should call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut();

    const encryptSpy = jest.spyOn(hasherStub, 'hash');
    await sut.add(mockAddAccountParams());
    expect(encryptSpy).toHaveBeenCalledWith('any_password');
  });

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut();

    jest.spyOn(hasherStub, 'hash').mockImplementationOnce(throwError);

    const promise = sut.add(mockAddAccountParams());
    expect(promise).rejects.toThrow();
  });

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();

    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add');

    await sut.add(mockAddAccountParams());
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    });
  });

  test('Should throw if DbAddAccount throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();

    jest.spyOn(addAccountRepositoryStub, 'add').mockImplementationOnce(throwError);

    const promise = sut.add(mockAddAccountParams());
    expect(promise).rejects.toThrow();
  });

  test('Should return an accoun on success', async () => {
    const { sut } = makeSut();

    const account = await sut.add(mockAddAccountParams());
    expect(account).toEqual(mockAccountModel());
  });

  test('Should return null if LoadAccountByEmailRepository not return null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(new Promise(resolve => resolve(mockAccountModel())));
    const account = await sut.add(mockAddAccountParams());
    expect(account).toBeNull();
  });

  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail');
    await sut.add(mockAddAccountParams());
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com');
  });
});
