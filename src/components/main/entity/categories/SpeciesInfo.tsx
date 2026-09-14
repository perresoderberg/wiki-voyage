import type { WikidataSpecies } from "../../../../types/wikidata";
import {
  InfoLinkListRow,
  InfoLinkRow,
  InfoRow,
} from "../content/InfoComponents";

export function SpeciesInfo({ species }: { species: WikidataSpecies }) {
  return (
    <div className="min-w-0 grid grid-cols-[180px_minmax(0,1fr)] gap-x-4 gap-y-3">
      <InfoRow label="Scientific name" value={species.scientificName} />

      <InfoLinkListRow label="Common names" values={species.commonNames} />

      <InfoLinkRow label="Taxon rank" value={species.taxonRank} />
      <InfoLinkRow label="Parent taxon" value={species.parentTaxon} />

      <InfoLinkRow
        label="Conservation status"
        value={species.conservationStatus}
      />

      <InfoLinkListRow label="Endemic to" values={species.endemicTo} />

      <InfoLinkRow label="Taxon author" value={species.taxonAuthor} />
    </div>
  );
}
