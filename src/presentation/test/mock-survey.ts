import { mockFakeSurvey, mockSurveysModel } from '@/domain/test';
import { LoadSurveyById } from '../controllers/survey-result/save-survey-result/save-survey-result-controller-protocols';
import { AddSurvey, AddSurveyParams } from '../controllers/survey/add-survey/add-survey-controller-protocols';
import { LoadSurveys, SurveyModel } from '../controllers/survey/load-surveys/load-survey-controller-protocols';

export const mockAddSurvey = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add (data: AddSurveyParams): Promise<void> {
      return Promise.resolve();
    }
  }

  return new AddSurveyStub();
};

export const mockLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return Promise.resolve(mockSurveysModel());
    }
  }

  return new LoadSurveysStub();
};

export const mockLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById (id: string): Promise<SurveyModel> {
      return Promise.resolve(mockFakeSurvey());
    }
  }

  return new LoadSurveyByIdStub();
};
