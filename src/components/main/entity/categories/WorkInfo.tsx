import type { WikidataWork } from "../../../../types/wikidata";
import {
  InfoLinkListRow,
  InfoLinkRow,
  InfoRow,
} from "../content/InfoComponents";

export function WorkInfo({ work }: { work: WikidataWork }) {
  return (
    <div className="min-w-0 grid grid-cols-[180px_minmax(0,1fr)] gap-x-4 gap-y-3">
      <InfoLinkListRow label="Creators" values={work.creator} />

      <InfoRow label="Publication date" value={work.publicationDate} />

      <InfoLinkListRow label="Genres" values={work.genre} />
      <InfoLinkListRow label="Publishers" values={work.publisher} />
      <InfoLinkListRow label="Language" values={work.language} />

      <InfoLinkRow label="Country" value={work.country} />

      <InfoLinkListRow label="Series" values={work.series} />
      <InfoLinkListRow label="Based on" values={work.basedOn} />
      <InfoLinkListRow label="Part of" values={work.partOf} />
    </div>
  );
}
