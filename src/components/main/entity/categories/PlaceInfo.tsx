import type { WikidataPlace } from "../../../../types/wikidata";
import { InfoListRow, InfoRow } from "../content/InfoComponents";

export function PlaceInfo({ place }: { place: WikidataPlace }) {
  return (
    <div className="min-w-0 grid grid-cols-[180px_minmax(0,1fr)] gap-x-4 gap-y-3">
      <InfoRow label="Country" value={place.country} />
      <InfoRow label="Continent" value={place.continent} />
      <InfoRow label="Located in" value={place.locatedIn} />
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
      <InfoListRow label="Official language" values={place.officialLanguage} />
      <InfoListRow label="Currency" values={place.currency} />
      <InfoListRow label="Contains" values={place.contains} />
      <InfoListRow label="Shares border with" values={place.sharesBorderWith} />
      <InfoListRow
        label="Neighboring body of water"
        values={place.neighboringBodyOfWater}
      />
    </div>
  );
}
