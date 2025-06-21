import type { HttpResponse } from '../utils';
import type { NewTeam } from './types';

import { post } from '@http';

import { urls } from '../urls';

export function postTeam(team: NewTeam): Promise<HttpResponse> {
  return post({ url: urls.postTeam, body: team });
}
