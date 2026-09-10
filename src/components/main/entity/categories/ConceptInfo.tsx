import type { WikidataConcept } from "../../../../types/wikidata";
import { InfoListRow, InfoRow } from "../content/InfoComponents";

export function ConceptInfo({ concept }: { concept: WikidataConcept }) {
  return (
    <div className="min-w-0 grid grid-cols-[180px_minmax(0,1fr)] gap-x-4 gap-y-3">
      {/* Classification */}

      <InfoRow label="Concept type" value={concept.conceptType} />

      <InfoListRow label="Instance of" values={concept.instanceOf} />

      <InfoListRow label="Subclass of" values={concept.subclassOf} />

      <InfoListRow label="Facet of" values={concept.facetOf} />

      {/* Basic information */}

      <InfoRow label="Inception date" value={concept.inceptionDate} />

      <InfoRow label="Formula" value={concept.formula} />

      {/* Subjects / disciplines */}

      <InfoListRow label="Field of work" values={concept.fieldOfWork} />

      <InfoListRow label="Studied by" values={concept.studiedBy} />

      <InfoListRow label="Main subject" values={concept.mainSubject} />

      {/* Structure */}

      <InfoListRow label="Part of" values={concept.partOf} />

      <InfoListRow label="Has part" values={concept.hasPart} />

      <InfoListRow label="Based on" values={concept.basedOn} />

      {/* Causality */}

      <InfoListRow label="Cause" values={concept.cause} />

      <InfoListRow label="Effect" values={concept.effect} />

      {/* Comparison */}

      <InfoListRow label="Opposite of" values={concept.oppositeOf} />

      <InfoListRow label="Different from" values={concept.differentFrom} />

      <InfoListRow
        label="Said to be the same as"
        values={concept.saidToBeTheSameAs}
      />

      {/* Historical relationships */}

      <InfoListRow label="Follows" values={concept.follows} />

      <InfoListRow label="Followed by" values={concept.followedBy} />

      <InfoListRow label="Replaces" values={concept.replaces} />

      <InfoListRow label="Replaced by" values={concept.replacedBy} />

      {/* People / sources */}

      <InfoListRow
        label="Discoverer or inventor"
        values={concept.discovererOrInventor}
      />

      <InfoListRow
        label="Described by source"
        values={concept.describedBySource}
      />

      {/* Other */}

      <InfoListRow label="Has quality" values={concept.hasQuality} />

      <InfoRow label="Commons category" value={concept.commonsCategory} />
    </div>
  );
}
