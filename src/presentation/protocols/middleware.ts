import { HttpRequest, HttpResponse } from './http';

export interface Middlewaew {
  handle (httpRequest: HttpRequest): Promise<HttpResponse>
}
