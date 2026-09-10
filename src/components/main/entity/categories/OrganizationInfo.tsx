import type { WikidataOrganization } from "../../../../types/wikidata";
import { InfoListRow, InfoRow } from "../content/InfoComponents";

export function OrganizationInfo({
  organization,
}: {
  organization: WikidataOrganization;
}) {
  return (
    <div className="min-w-0 grid grid-cols-[180px_minmax(0,1fr)] gap-x-4 gap-y-3">
      <InfoRow label="Founded" value={organization.inceptionDate} />
      <InfoRow label="Dissolved" value={organization.dissolutionDate} />
      <InfoRow label="Headquarters" value={organization.headquarters} />
      <InfoRow label="Country" value={organization.country} />
      <InfoRow label="Official website" value={organization.officialWebsite} />
      <InfoListRow label="Founders" values={organization.founder} />
      <InfoRow
        label="Employees"
        value={
          organization.employees !== null
            ? organization.employees.toLocaleString()
            : null
        }
      />
      <InfoListRow label="Leader" values={organization.leader} />
      <InfoListRow label="Member of" values={organization.memberOf} />
      <InfoListRow
        label="Parent organization"
        values={organization.parentOrganization}
      />
      <InfoListRow label="Subsidiaries" values={organization.subsidiaries} />
      <InfoListRow label="Field of work" values={organization.fieldOfWork} />
    </div>
  );
}
