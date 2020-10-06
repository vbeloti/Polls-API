import { DbSaveSurveyResult } from './db-save-survey-result';
import { SaveSurveyResultParams, SurveyResultModel, SaveSurveyResultRepository } from './db-save-survey-result-protocols';
import MockDate from 'mockdate';

const makeFakeSurveyResultData = (): SaveSurveyResultParams => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_answer',
  date: new Date()
});

const makeFakeSurveyResult = (): SurveyResultModel => Object.assign({}, makeFakeSurveyResultData(), {
  id: 'any_id'
});

type SutTypes = {
  sut: DbSaveSurveyResult;
  saveSurveyResultRepositoryStuby: SaveSurveyResultRepository;
}

const makeSaveResultSurveyRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStuby implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return new Promise(resolve => resolve(makeFakeSurveyResult()));
    }
  }
  return new SaveSurveyResultRepositoryStuby();
};

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStuby = makeSaveResultSurveyRepository();
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
    const surveyResultData = makeFakeSurveyResultData();
    await sut.save(surveyResultData);
    expect(saveSpy).toHaveBeenCalledWith(surveyResultData);
  });

  test('Should throw if SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStuby } = makeSut();

    jest.spyOn(saveSurveyResultRepositoryStuby, 'save').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));

    const promise = sut.save(makeFakeSurveyResultData());
    expect(promise).rejects.toThrow();
  });

  test('Should return SurveyResult on success', async () => {
    const { sut } = makeSut();
    const surveyResult = await sut.save(makeFakeSurveyResultData());
    expect(surveyResult).toEqual(makeFakeSurveyResult());
  });
});
