import { useState } from "react";
import type { WikidataLink } from "../../../../types/wikidata";

export function InfoLabel({ label }: { label: string }) {
  return <div className="font-semibold text-text-muted">{label}</div>;
}

export function InfoValue({ value }: { value: string | null }) {
  return <div>{value}</div>;
}

export function InfoUrlRow({
  label,
  url,
}: {
  label: string;
  url: string | null;
}) {
  if (!url) {
    return null;
  }

  return (
    <>
      <InfoLabel label={label} />

      <div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link hover:text-link-hover hover:underline"
        >
          {label}
        </a>
      </div>
    </>
  );
}

export function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) {
  if (!value) {
    return null;
  }

  return (
    <>
      <InfoLabel label={label} />
      <InfoValue value={value} />
    </>
  );
}

export function InfoList({ values }: { values: string[] }) {
  if (values.length === 0) {
    return null;
  }

  if (values.length > 3) {
    return (
      <div className="grid grid-cols-3 gap-x-6 gap-y-1 capitalize">
        {values.map((value, index) => (
          <div key={`${value}-${index}`}>{value}</div>
        ))}
      </div>
    );
  }

  return <div className="capitalize">{values.join(", ")}</div>;
}

export function ExpandCollapse({
  expanded,
  onToggle,
}: {
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          onToggle();
        }
      }}
      className="mt-2 cursor-pointer rounded-md bg-hover-accent px-3 py-2 text-sm text-text transition-colors hover:bg-hover"
    >
      {expanded ? "Click to collapse" : "Click to expand"}
    </div>
  );
}

export function InfoListRow({
  label,
  values,
}: {
  label: string;
  values: string[];
}) {
  const [expanded, setExpanded] = useState(false);

  if (values.length === 0) {
    return null;
  }

  const shouldCollapse = values.length > 3;

  const displayedValues =
    shouldCollapse && !expanded ? values.slice(0, 3) : values;

  return (
    <>
      <InfoLabel label={label} />

      <div>
        <InfoList values={displayedValues} />

        {shouldCollapse && (
          <ExpandCollapse
            expanded={expanded}
            onToggle={() => setExpanded((current) => !current)}
          />
        )}
      </div>
    </>
  );
}

export function InfoLink({ link }: { link: WikidataLink }) {
  const href = link.wikipediaUrl ?? `https://www.wikidata.org/wiki/${link.id}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-link hover:text-link-hover hover:underline capitalize"
    >
      {link.label}
    </a>
  );
}

export function InfoLinkRow({
  label,
  value,
}: {
  label: string;
  value: WikidataLink | null;
}) {
  if (!value) {
    return null;
  }

  return (
    <>
      <InfoLabel label={label} />

      <div>
        <InfoLink link={value} />
      </div>
    </>
  );
}

export function InfoLinkListRow({
  label,
  values,
}: {
  label: string;
  values: WikidataLink[];
}) {
  const [expanded, setExpanded] = useState(false);

  if (values.length === 0) {
    return null;
  }

  const shouldCollapse = values.length > 3;

  const displayedValues =
    shouldCollapse && !expanded ? values.slice(0, 3) : values;

  return (
    <>
      <InfoLabel label={label} />

      <div>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {displayedValues.map((link) => (
            <InfoLink key={link.id} link={link} />
          ))}
        </div>

        {shouldCollapse && (
          <ExpandCollapse
            expanded={expanded}
            onToggle={() => setExpanded((current) => !current)}
          />
        )}
      </div>
    </>
  );
}
