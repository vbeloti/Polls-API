import { DbAddSurvey } from './db-add-survey';
import { AddSurveyModel, AddSurveyRepository } from './db-add-survey-protocols';

const makeFakeSurveyData = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }]
});

describe('DbAddSurvey UseCase', () => {
  test('Should call AddSurveyRepository with correct values', async () => {
    class AddSurveyRepositoryStuby implements AddSurveyRepository {
      async add (surveyData: AddSurveyModel): Promise<void> {
        return new Promise(resolve => resolve());
      }
    }
    const addSurveyRepositoryStuby = new AddSurveyRepositoryStuby();
    const addSpy = jest.spyOn(addSurveyRepositoryStuby, 'add');
    const sut = new DbAddSurvey(addSurveyRepositoryStuby);
    const surveyData = makeFakeSurveyData();
    await sut.add(surveyData);
    expect(addSpy).toHaveBeenCalledWith(surveyData);
  });
});
