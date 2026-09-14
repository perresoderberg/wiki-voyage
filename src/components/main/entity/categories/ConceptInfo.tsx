import type { WikidataConcept } from "../../../../types/wikidata";
import { InfoLinkListRow, InfoRow } from "../content/InfoComponents";

export function ConceptInfo({ concept }: { concept: WikidataConcept }) {
  return (
    <div className="min-w-0 grid grid-cols-[180px_minmax(0,1fr)] gap-x-4 gap-y-3">
      {/* Classification */}

      <InfoRow label="Concept type" value={concept.conceptType} />

      <InfoLinkListRow label="Instance of" values={concept.instanceOf} />

      <InfoLinkListRow label="Subclass of" values={concept.subclassOf} />

      <InfoLinkListRow label="Facet of" values={concept.facetOf} />

      {/* Basic information */}

      <InfoRow label="Inception date" value={concept.inceptionDate} />

      <InfoRow label="Formula" value={concept.formula} />

      {/* Subjects / disciplines */}

      <InfoLinkListRow label="Field of work" values={concept.fieldOfWork} />

      <InfoLinkListRow label="Studied by" values={concept.studiedBy} />

      <InfoLinkListRow label="Main subject" values={concept.mainSubject} />

      {/* Structure */}

      <InfoLinkListRow label="Part of" values={concept.partOf} />

      <InfoLinkListRow label="Has part" values={concept.hasPart} />

      <InfoLinkListRow label="Based on" values={concept.basedOn} />

      {/* Causality */}

      <InfoLinkListRow label="Cause" values={concept.cause} />

      <InfoLinkListRow label="Effect" values={concept.effect} />

      {/* Comparison */}

      <InfoLinkListRow label="Opposite of" values={concept.oppositeOf} />

      <InfoLinkListRow label="Different from" values={concept.differentFrom} />

      <InfoLinkListRow
        label="Said to be the same as"
        values={concept.saidToBeTheSameAs}
      />

      {/* Historical relationships */}

      <InfoLinkListRow label="Follows" values={concept.follows} />

      <InfoLinkListRow label="Followed by" values={concept.followedBy} />

      <InfoLinkListRow label="Replaces" values={concept.replaces} />

      <InfoLinkListRow label="Replaced by" values={concept.replacedBy} />

      {/* People / sources */}

      <InfoLinkListRow
        label="Discoverer or inventor"
        values={concept.discovererOrInventor}
      />

      <InfoLinkListRow
        label="Described by source"
        values={concept.describedBySource}
      />

      {/* Other */}

      <InfoLinkListRow label="Has quality" values={concept.hasQuality} />

      <InfoRow label="Commons category" value={concept.commonsCategory} />
    </div>
  );
}
