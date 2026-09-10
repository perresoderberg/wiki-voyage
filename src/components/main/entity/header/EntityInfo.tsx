import type { WikidataEntity } from "../../../../types/wikidata";
import { ConceptInfo } from "../categories/ConceptInfo";
import { EventInfo } from "../categories/EventInfo";
import { OrganizationInfo } from "../categories/OrganizationInfo";
import { PersonInfo } from "../categories/PersonInfo";
import { PlaceInfo } from "../categories/PlaceInfo";
import { SpeciesInfo } from "../categories/SpeciesInfo";
import { WorkInfo } from "../categories/WorkInfo";

export function EntityInfo({ entity }: { entity: WikidataEntity }) {
  switch (entity.type) {
    case "person":
      return <PersonInfo person={entity} />;

    case "place":
      return <PlaceInfo place={entity} />;

    case "organization":
      return <OrganizationInfo organization={entity} />;

    case "event":
      return <EventInfo event={entity} />;

    case "concept":
      return <ConceptInfo concept={entity} />;

    case "work":
      return <WorkInfo work={entity} />;

    case "species":
      return <SpeciesInfo species={entity} />;

    default:
      return null;
  }
}
