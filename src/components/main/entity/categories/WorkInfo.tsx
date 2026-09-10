import type { WikidataWork } from "../../../../types/wikidata";
import { InfoListRow, InfoRow } from "../content/InfoComponents";

export function WorkInfo({ work }: { work: WikidataWork }) {
  return (
    <div className="min-w-0 grid grid-cols-[180px_minmax(0,1fr)] gap-x-4 gap-y-3">
      <InfoListRow label="Creators" values={work.creator} />
      <InfoRow label="Publication date" value={work.publicationDate} />
      <InfoListRow label="Genres" values={work.genre} />
      <InfoListRow label="Publishers" values={work.publisher} />
      <InfoListRow label="Language" values={work.language} />
      <InfoRow label="Country" value={work.country} />
      <InfoListRow label="Series" values={work.series} />
      <InfoListRow label="Based on" values={work.basedOn} />
      <InfoListRow label="Part of" values={work.partOf} />
    </div>
  );
}
