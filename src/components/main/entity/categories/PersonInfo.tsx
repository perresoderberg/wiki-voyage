import type { WikidataPerson } from "../../../../types/wikidata";
import { InfoListRow, InfoRow } from "../content/InfoComponents";

function calculateAge(
  birthDate: string,
  endDate: string = new Date().toISOString(),
): number {
  const birth = new Date(birthDate);
  const end = new Date(endDate);

  let age = end.getFullYear() - birth.getFullYear();

  const birthdayNotReached =
    end.getMonth() < birth.getMonth() ||
    (end.getMonth() === birth.getMonth() && end.getDate() < birth.getDate());

  if (birthdayNotReached) {
    age--;
  }

  return age;
}

export function PersonInfo({ person }: { person: WikidataPerson }) {
  const age =
    person.birthDate !== null
      ? calculateAge(person.birthDate, person.deathDate ?? undefined)
      : null;

  const birthDate =
    person.birthDate !== null
      ? `${person.birthDate}${
          !person.deathDate && age !== null ? ` (${age} years old)` : ""
        }`
      : null;

  const deathDate =
    person.deathDate !== null
      ? `${person.deathDate}${
          age !== null ? ` (Died at ${age} years old)` : ""
        }`
      : null;

  return (
    <div className="min-w-0 grid grid-cols-[180px_minmax(0,1fr)] gap-x-4 gap-y-3">
      <InfoRow label="Birth date" value={birthDate} />
      <InfoRow label="Death date" value={deathDate} />
      <InfoRow label="Place of birth" value={person.birthPlace} />
      <InfoRow label="Place of death" value={person.deathPlace} />
      <InfoListRow label="Nationality" values={person.nationality} />
      <InfoListRow label="Occupations" values={person.occupations} />
      <InfoListRow label="Employers" values={person.employer} />
      <InfoListRow label="Education" values={person.education} />
      <InfoListRow label="Awards" values={person.awards} />
      <InfoListRow label="Member of" values={person.memberOf} />
      <InfoListRow label="Influenced by" values={person.influencedBy} />
      <InfoListRow label="Residence" values={person.residence} />
      <InfoRow label="Father" value={person.father} />
      <InfoRow label="Mother" value={person.mother} />
      <InfoListRow label="Spouse" values={person.spouse} />
      <InfoListRow label="Children" values={person.children} />
      <InfoListRow label="Siblings" values={person.siblings} />
    </div>
  );
}
