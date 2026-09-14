import type { WikidataEvent } from "../../../../types/wikidata";
import {
  InfoLinkListRow,
  InfoLinkRow,
  InfoRow,
} from "../content/InfoComponents";

export function EventInfo({ event }: { event: WikidataEvent }) {
  return (
    <div className="min-w-0 grid grid-cols-[180px_minmax(0,1fr)] gap-x-4 gap-y-3">
      <InfoRow label="Start date" value={event.startDate} />
      <InfoRow label="End date" value={event.endDate} />

      <InfoLinkRow label="Location" value={event.location} />

      <InfoLinkListRow label="Participants" values={event.participant} />
      <InfoLinkListRow label="Organizers" values={event.organizer} />

      <InfoLinkRow label="Country" value={event.country} />

      <InfoLinkListRow
        label="Significant event"
        values={event.significantEvent}
      />
    </div>
  );
}
