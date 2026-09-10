import type { WikidataSpecies } from "../../../../types/wikidata";
import { InfoListRow, InfoRow } from "../content/InfoComponents";

export function SpeciesInfo({ species }: { species: WikidataSpecies }) {
  return (
    <div className="min-w-0 grid grid-cols-[180px_minmax(0,1fr)] gap-x-4 gap-y-3">
      <InfoRow label="Scientific name" value={species.scientificName} />
      <InfoListRow label="Common names" values={species.commonNames} />
      <InfoRow label="Taxon rank" value={species.taxonRank} />
      <InfoRow label="Parent taxon" value={species.parentTaxon} />
      <InfoRow label="Conservation status" value={species.conservationStatus} />
      <InfoListRow label="Endemic to" values={species.endemicTo} />
      <InfoRow label="Taxon author" value={species.taxonAuthor} />
    </div>
  );
}
