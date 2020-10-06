import { DbSaveSurveyResult } from './db-save-survey-result';
import { SaveSurveyResultParams, SurveyResultModel, SaveSurveyResultRepository } from './db-save-survey-result-protocols';
import MockDate from 'mockdate';
import { mockSaveSurveyResultParams, mockSurveyResultModel, throwError } from '@/domain/test';
import { mockSaveResultSurveyRepository } from '@/data/test';

type SutTypes = {
  sut: DbSaveSurveyResult;
  saveSurveyResultRepositoryStuby: SaveSurveyResultRepository;
}

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStuby = mockSaveResultSurveyRepository();
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStuby);
  return {
    sut,
    saveSurveyResultRepositoryStuby
  };
};

describe('DbSaveSurveyResult Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call SaveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStuby } = makeSut();
    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStuby, 'save');
    const surveyResultData = mockSaveSurveyResultParams();
    await sut.save(surveyResultData);
    expect(saveSpy).toHaveBeenCalledWith(surveyResultData);
  });

  test('Should throw if SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStuby } = makeSut();

    jest.spyOn(saveSurveyResultRepositoryStuby, 'save').mockImplementationOnce(throwError);

    const promise = sut.save(mockSaveSurveyResultParams());
    expect(promise).rejects.toThrow();
  });

  test('Should return SurveyResult on success', async () => {
    const { sut } = makeSut();
    const surveyResult = await sut.save(mockSaveSurveyResultParams());
    expect(surveyResult).toEqual(mockSurveyResultModel());
  });
});
