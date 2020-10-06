import { AddSurveyRepository } from '../../../protocols/db/survey/add-survey-repository';
import { AddSurvey, AddSurveyParams } from './db-add-survey-protocols';

export class DbAddSurvey implements AddSurvey {
  constructor (private readonly addSurveyRepository: AddSurveyRepository) {
    this.addSurveyRepository = addSurveyRepository;
  }

  async add (data: AddSurveyParams): Promise<void> {
    await this.addSurveyRepository.add(data);
  }
}
