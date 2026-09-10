import type { WikidataEvent } from "../../../../types/wikidata";
import { InfoListRow, InfoRow } from "../content/InfoComponents";

export function EventInfo({ event }: { event: WikidataEvent }) {
  return (
    <div className="min-w-0 grid grid-cols-[180px_minmax(0,1fr)] gap-x-4 gap-y-3">
      <InfoRow label="Start date" value={event.startDate} />
      <InfoRow label="End date" value={event.endDate} />
      <InfoRow label="Location" value={event.location} />
      <InfoListRow label="Participant" values={event.participant} />
      <InfoListRow label="Organizer" values={event.organizer} />
      <InfoRow label="Country" value={event.country} />
      <InfoListRow label="Significant event" values={event.significantEvent} />
    </div>
  );
}
