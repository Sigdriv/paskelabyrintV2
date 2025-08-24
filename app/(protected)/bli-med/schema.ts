import { globalSchema } from '@schema';

export function useSchema() {
  const { createStringSchema, createEmailSchema, createIntSchema } =
    globalSchema();

  const schema = {
    contactName: createStringSchema('Kontaktperson', 5, 400),
    contactEmail: createEmailSchema(),
    teamName: createStringSchema('Lagets navn', 5, 400),
    numberOfParticipants: createIntSchema('Antall deltakere', 1, 100),
    youngestParticipantAge: createIntSchema('Yngste deltaker alder', 0, 100),
    oldestParticipantAge: createIntSchema('Eldste deltaker alder', 0, 150),
  };

  return { schema };
}
