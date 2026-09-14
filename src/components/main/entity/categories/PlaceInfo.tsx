import type { WikidataPlace } from "../../../../types/wikidata";
import {
  InfoLinkListRow,
  InfoLinkRow,
  InfoRow,
} from "../content/InfoComponents";

export function PlaceInfo({ place }: { place: WikidataPlace }) {
  return (
    <div className="min-w-0 grid grid-cols-[180px_minmax(0,1fr)] gap-x-4 gap-y-3">
      <InfoLinkRow label="Country" value={place.country} />
      <InfoLinkRow label="Continent" value={place.continent} />
      <InfoLinkRow label="Located in" value={place.locatedIn} />

      <InfoRow
        label="Population"
        value={
          place.population !== null ? place.population.toLocaleString() : null
        }
      />

      <InfoRow
        label="Area"
        value={
          place.area !== null ? `${place.area.toLocaleString()} km²` : null
        }
      />

      <InfoRow label="Inception date" value={place.inceptionDate} />

      <InfoRow
        label="Coordinates"
        value={
          place.coordinates
            ? `${place.coordinates.latitude}, ${place.coordinates.longitude}`
            : null
        }
      />

      <InfoLinkListRow
        label="Official language"
        values={place.officialLanguage}
      />

      <InfoLinkListRow label="Currency" values={place.currency} />

      <InfoLinkListRow label="Contains" values={place.contains} />

      <InfoLinkListRow
        label="Shares border with"
        values={place.sharesBorderWith}
      />

      <InfoLinkListRow
        label="Neighboring body of water"
        values={place.neighboringBodyOfWater}
      />
    </div>
  );
}
