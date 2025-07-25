'use client';

import { ContactPersonTeams } from './ContactPersonTeams';
import { YourTeams } from './YourTeams';

export default function Teams() {
  return (
    <div className=" flex gap-8 flex-col">
      <YourTeams />

      <ContactPersonTeams />
    </div>
  );
}
