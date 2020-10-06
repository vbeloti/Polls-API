import { mockFakeSurvey, mockSurveysModel } from '@/domain/test/mock-survey';
import { AddSurveyRepository } from '../protocols/db/survey/add-survey-repository';
import { LoadSurveyByIdRepository } from '../protocols/db/survey/load-survey-by-id-repository';
import { AddSurveyParams } from '../usecases/survey/add-survey/db-add-survey-protocols';
import { LoadSurveysRepository, SurveyModel } from '../usecases/survey/load-surveys/db-load-surveys-protocols';

export const mockAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStuby implements AddSurveyRepository {
    async add (surveyData: AddSurveyParams): Promise<void> {
      return new Promise(resolve => resolve());
    }
  }
  return new AddSurveyRepositoryStuby();
};

export const mockLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById (id: string): Promise<SurveyModel> {
      return new Promise(resolve => resolve(mockFakeSurvey()));
    }
  }

  return new LoadSurveyByIdRepositoryStub();
};

export const mockLoadSurveysRepository = (): LoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    async loadAll (): Promise<SurveyModel[]> {
      return new Promise(resolve => resolve(mockSurveysModel()));
    }
  }

  return new LoadSurveysRepositoryStub();
};
