export type Team = {
  id: string;
  contactName: string;
  contactEmail: string;
  teamName: string;
  numberOfParticipants: string;
  youngestParticipantAge?: string;
  oldestParticipantAge?: string;
  createdAt: string;
};

export type NewTeam = Omit<Team, 'id' | 'createdAt'>;

export type TeamsResponse = Pick<Team, 'id' | 'createdAt'>;
