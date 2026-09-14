import type { WikidataPerson } from "../../../../types/wikidata";
import {
  InfoLinkListRow,
  InfoLinkRow,
  InfoRow,
} from "../content/InfoComponents";

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

      <InfoLinkRow label="Place of birth" value={person.birthPlace} />
      <InfoLinkRow label="Place of death" value={person.deathPlace} />

      <InfoLinkListRow label="Nationality" values={person.nationality} />
      <InfoLinkListRow label="Occupations" values={person.occupations} />
      <InfoLinkListRow label="Employers" values={person.employer} />
      <InfoLinkListRow label="Education" values={person.education} />
      <InfoLinkListRow label="Awards" values={person.awards} />
      <InfoLinkListRow label="Member of" values={person.memberOf} />
      <InfoLinkListRow label="Influenced by" values={person.influencedBy} />
      <InfoLinkListRow label="Residence" values={person.residence} />

      <InfoLinkRow label="Father" value={person.father} />
      <InfoLinkRow label="Mother" value={person.mother} />

      <InfoLinkListRow label="Spouse" values={person.spouse} />
      <InfoLinkListRow label="Children" values={person.children} />
      <InfoLinkListRow label="Siblings" values={person.siblings} />
    </div>
  );
}
