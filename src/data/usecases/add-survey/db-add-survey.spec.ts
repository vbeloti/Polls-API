import { DbAddSurvey } from './db-add-survey';
import { AddSurveyModel, AddSurveyRepository } from './db-add-survey-protocols';

const makeFakeSurveyData = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }]
});

interface SutTypes {
  sut: DbAddSurvey;
  addSurveyRepositoryStuby: AddSurveyRepository;
}

const makeAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStuby implements AddSurveyRepository {
    async add (surveyData: AddSurveyModel): Promise<void> {
      return new Promise(resolve => resolve());
    }
  }
  return new AddSurveyRepositoryStuby();
};

const makeSut = (): SutTypes => {
  const addSurveyRepositoryStuby = makeAddSurveyRepository();
  const sut = new DbAddSurvey(addSurveyRepositoryStuby);
  return {
    sut,
    addSurveyRepositoryStuby
  };
};

describe('DbAddSurvey UseCase', () => {
  test('Should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositoryStuby } = makeSut();
    const addSpy = jest.spyOn(addSurveyRepositoryStuby, 'add');
    const surveyData = makeFakeSurveyData();
    await sut.add(surveyData);
    expect(addSpy).toHaveBeenCalledWith(surveyData);
  });

  test('Should throw if AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositoryStuby } = makeSut();

    jest.spyOn(addSurveyRepositoryStuby, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));

    const promise = sut.add(makeFakeSurveyData());
    expect(promise).rejects.toThrow();
  });
});
