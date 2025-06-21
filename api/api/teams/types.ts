export type Team = {
  id: string;
  contactName: string;
  contactEmail: string;
  teamName: string;
  numberOfParticipants: string;
  youngestParticipantAge?: string;
  oldestParticipantAge?: string;
  createdAt: string;
  updatedAt: string;
};

export type NewTeam = Omit<Team, 'id' | 'createdAt' | 'updatedAt'>;
