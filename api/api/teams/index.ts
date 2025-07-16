import type { HttpResponse } from '../utils';
import type { NewTeam, Team, TeamsResponse } from './types';

import { del, get, post } from '@http';

import { urls } from '../urls';

export function postTeam(team: NewTeam): Promise<TeamsResponse> {
  return post({ url: urls.postTeam, body: team });
}

export function getTeams(): Promise<Team[]> {
  return get({ url: urls.getTeams });
}

export function deleteTeam(id: string): Promise<HttpResponse> {
  return del({ url: urls.deleteTeam(id) });
}
