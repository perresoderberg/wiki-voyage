import type { WikidataOrganization } from "../../../../types/wikidata";
import {
  InfoLinkListRow,
  InfoLinkRow,
  InfoRow,
  InfoUrlRow,
} from "../content/InfoComponents";

export function OrganizationInfo({
  organization,
}: {
  organization: WikidataOrganization;
}) {
  return (
    <div className="min-w-0 grid grid-cols-[180px_minmax(0,1fr)] gap-x-4 gap-y-3">
      <InfoRow label="Founded" value={organization.inceptionDate} />
      <InfoRow label="Dissolved" value={organization.dissolutionDate} />

      <InfoLinkRow label="Headquarters" value={organization.headquarters} />

      <InfoLinkRow label="Country" value={organization.country} />

      <InfoUrlRow label="Official website" url={organization.officialWebsite} />

      <InfoLinkListRow label="Founders" values={organization.founder} />

      <InfoRow
        label="Employees"
        value={
          organization.employees !== null
            ? organization.employees.toLocaleString()
            : null
        }
      />

      <InfoLinkListRow label="Leader" values={organization.leader} />
      <InfoLinkListRow label="Member of" values={organization.memberOf} />

      <InfoLinkListRow
        label="Parent organization"
        values={organization.parentOrganization}
      />

      <InfoLinkListRow
        label="Subsidiaries"
        values={organization.subsidiaries}
      />

      <InfoLinkListRow
        label="Field of work"
        values={organization.fieldOfWork}
      />
    </div>
  );
}
