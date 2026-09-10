import { useState } from "react";

export function InfoLabel({ label }: { label: string }) {
  return <div className="font-semibold text-gray-600">{label}</div>;
}

export function InfoValue({ value }: { value: string | null }) {
  return <div>{value}</div>;
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
      className="mt-2 cursor-pointer rounded-md bg-sky-50 px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-sky-100"
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
