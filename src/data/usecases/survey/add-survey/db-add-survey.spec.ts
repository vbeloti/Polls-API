import { DbAddSurvey } from './db-add-survey';
import { AddSurveyRepository } from './db-add-survey-protocols';
import MockDate from 'mockdate';
import { mockAddSurveyParams, throwError } from '@/domain/test';
import { mockAddSurveyRepository } from '@/data/test';

type SutTypes = {
  sut: DbAddSurvey;
  addSurveyRepositoryStuby: AddSurveyRepository;
}

const makeSut = (): SutTypes => {
  const addSurveyRepositoryStuby = mockAddSurveyRepository();
  const sut = new DbAddSurvey(addSurveyRepositoryStuby);
  return {
    sut,
    addSurveyRepositoryStuby
  };
};

describe('DbAddSurvey UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositoryStuby } = makeSut();
    const addSpy = jest.spyOn(addSurveyRepositoryStuby, 'add');
    const surveyData = mockAddSurveyParams();
    await sut.add(surveyData);
    expect(addSpy).toHaveBeenCalledWith(surveyData);
  });

  test('Should throw if AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositoryStuby } = makeSut();

    jest.spyOn(addSurveyRepositoryStuby, 'add').mockImplementationOnce(throwError);

    const promise = sut.add(mockAddSurveyParams());
    expect(promise).rejects.toThrow();
  });
});
