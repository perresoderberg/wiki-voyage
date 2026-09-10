import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import type {
  WikidataEntity,
  WikidataStatement,
} from "../../../../types/wikidata";

import { getWikidataStatements } from "../../../../services/wikidata-api";
import { ExpandCollapse } from "./InfoComponents";

function getGridColumns(count: number): string {
  if (count >= 8) {
    return "grid-cols-4";
  }

  if (count >= 5) {
    return "grid-cols-3";
  }

  if (count >= 2) {
    return "grid-cols-2";
  }

  return "grid-cols-1";
}

function WikidataPropertyGroup({
  statements,
  renderValue,
}: {
  statements: WikidataStatement[];
  renderValue: (statement: WikidataStatement) => ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);

  const first = statements[0];

  if (!first) {
    return null;
  }

  const shouldCollapse = statements.length > 3;

  const displayedStatements =
    shouldCollapse && !expanded ? statements.slice(0, 3) : statements;

  return (
    <section>
      <h4 className="mb-3 text-lg font-bold capitalize">
        {first.propertyLabel}
      </h4>

      <div
        className={`grid ${getGridColumns(statements.length)} gap-x-8 gap-y-2`}
      >
        {displayedStatements.map((statement, index) => (
          <div key={`${statement.propertyId}-${statement.value}-${index}`}>
            {renderValue(statement)}
          </div>
        ))}
      </div>

      {shouldCollapse && (
        <ExpandCollapse
          expanded={expanded}
          onToggle={() => setExpanded((current) => !current)}
        />
      )}
    </section>
  );
}

export function WikidataContent({ entity }: { entity: WikidataEntity }) {
  const [statements, setStatements] = useState<WikidataStatement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchStatements() {
      setLoading(true);
      setStatements([]);

      try {
        const data = await getWikidataStatements(entity.wikidataId);

        if (!cancelled) {
          setStatements(data);
        }
      } catch (error) {
        console.error("Failed to load Wikidata statements", error);

        if (!cancelled) {
          setStatements([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchStatements();

    return () => {
      cancelled = true;
    };
  }, [entity.wikidataId]);

  function renderValue(statement: WikidataStatement) {
    if (statement.wikipediaUrl && statement.valueLabel) {
      return (
        <a
          href={statement.wikipediaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 hover:underline capitalize"
        >
          {statement.valueLabel}
        </a>
      );
    }

    if (
      statement.value.startsWith("http://") ||
      statement.value.startsWith("https://")
    ) {
      return (
        <a
          href={statement.value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 hover:underline capitalize"
        >
          {statement.propertyLabel}
        </a>
      );
    }

    return (
      <span className="capitalize">
        {statement.valueLabel ?? statement.value}
      </span>
    );
  }

  if (loading) {
    return <div>Loading Wikidata...</div>;
  }

  const groupedStatements = statements.reduce<Map<string, WikidataStatement[]>>(
    (groups, statement) => {
      const existing = groups.get(statement.propertyId) ?? [];

      existing.push(statement);
      groups.set(statement.propertyId, existing);

      return groups;
    },
    new Map(),
  );

  return (
    <div className="flex flex-col gap-8">
      <section>
        <h3 className="text-2xl font-bold">{entity.name}</h3>

        {entity.description && <p className="mt-2">{entity.description}</p>}
      </section>

      {[...groupedStatements.values()].map((group) => {
        const first = group[0];

        if (!first) {
          return null;
        }

        return (
          <WikidataPropertyGroup
            key={first.propertyId}
            statements={group}
            renderValue={renderValue}
          />
        );
      })}

      {statements.length === 0 && (
        <div>No additional Wikidata data was found.</div>
      )}
    </div>
  );
}
