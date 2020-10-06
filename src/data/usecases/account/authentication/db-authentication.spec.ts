import { DbAuthentication } from './db-authentication';
import { mockFakeAuthentication, throwError } from '@/domain/test';

import {
  LoadAccountByEmailRepository,
  AuthenticationParams,
  HashCompare,
  Encrypter,
  UpdateAccessTokenRepository
} from './db-authentication-protocols';
import { mockEncrypter, mockHashCompare, mockLoadAccountByEmailRepository, mockUpdateAccessTokenRepository } from '@/data/test';

type SutTypes = {
  sut: DbAuthentication;
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository;
  hashCompareStub: HashCompare;
  encrypterStub: Encrypter;
  updateAccessTokenRepositoryStub: UpdateAccessTokenRepository;
}
const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository();
  const hashCompareStub = mockHashCompare();
  const encrypterStub = mockEncrypter();
  const updateAccessTokenRepositoryStub = mockUpdateAccessTokenRepository();
  const sut = new DbAuthentication(
    loadAccountByEmailRepositoryStub,
    hashCompareStub,
    encrypterStub,
    updateAccessTokenRepositoryStub
  );

  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashCompareStub,
    encrypterStub,
    updateAccessTokenRepositoryStub
  };
};

describe('DbAuthentication UseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail');
    await sut.auth(mockFakeAuthentication());
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com');
  });

  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockImplementationOnce(throwError);
    const promise = sut.auth(mockFakeAuthentication());
    await expect(promise).rejects.toThrow();
  });

  test('Should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(null);
    const acessToken = await sut.auth(mockFakeAuthentication());
    expect(acessToken).toBeNull();
  });

  test('Should call HashCompare with correct values', async () => {
    const { sut, hashCompareStub } = makeSut();
    const compareSpy = jest.spyOn(hashCompareStub, 'compare');
    await sut.auth(mockFakeAuthentication());
    expect(compareSpy).toHaveBeenCalledWith('any_password', 'any_password');
  });

  test('Should throw if HashCompare throws', async () => {
    const { sut, hashCompareStub } = makeSut();
    jest.spyOn(hashCompareStub, 'compare').mockImplementationOnce(throwError);
    const promise = sut.auth(mockFakeAuthentication());
    await expect(promise).rejects.toThrow();
  });

  test('Should return null if HashCompare returns false', async () => {
    const { sut, hashCompareStub } = makeSut();
    jest.spyOn(hashCompareStub, 'compare').mockReturnValueOnce(new Promise((resolve) => resolve(false)));
    const acessToken = await sut.auth(mockFakeAuthentication());
    expect(acessToken).toBeNull();
  });

  test('Should call Encrypter with correct id', async () => {
    const { sut, encrypterStub } = makeSut();
    const generateSpy = jest.spyOn(encrypterStub, 'encrypt');
    await sut.auth(mockFakeAuthentication());
    expect(generateSpy).toHaveBeenCalledWith('any_id');
  });

  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut();
    jest.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(throwError);
    const promise = sut.auth(mockFakeAuthentication());
    await expect(promise).rejects.toThrow();
  });

  test('Should return a token on success', async () => {
    const { sut } = makeSut();
    const accessToken = await sut.auth(mockFakeAuthentication());
    expect(accessToken).toBe('any_token');
  });

  test('Should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut();
    const updateSpy = jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken');
    await sut.auth(mockFakeAuthentication());
    expect(updateSpy).toHaveBeenCalledWith('any_id', 'any_token');
  });

  test('Should throw if UpdateAccessTokenRepository throws', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut();
    jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken').mockImplementationOnce(throwError);
    const promise = sut.auth(mockFakeAuthentication());
    await expect(promise).rejects.toThrow();
  });
});
