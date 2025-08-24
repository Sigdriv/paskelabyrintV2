import type { HttpResponse } from '../utils';
import type { NewTeam, Team, TeamsResponse } from './types';

import { del, get, patch, post } from '@http';
import { objectToQueryParams } from '@utils';

import { urls } from '../urls';

export function postTeam(team: NewTeam): Promise<TeamsResponse> {
  return post({ url: urls.postTeam, body: team });
}

export interface GetTeamsParams {
  isContactPersonTeams?: boolean;
}

export function getTeams({
  isContactPersonTeams,
}: GetTeamsParams = {}): Promise<Team[]> {
  const queryParams = objectToQueryParams({ isContactPersonTeams });

  return get({ url: urls.getTeams(queryParams) });
}

export function deleteTeam(id: string): Promise<HttpResponse> {
  return del({ url: urls.deleteTeam(id) });
}

export interface GetTeamParams {
  teamId: string;
}

export function getTeam({ teamId }: GetTeamParams): Promise<Team> {
  return get({ url: urls.getTeam(teamId) });
}

export function updateTeam(team: Team): Promise<{ message: string }> {
  return patch({ url: urls.updateTeam, body: team });
}
