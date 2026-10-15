import type { ReactNode } from 'react';
import './Stacked.css';

/**
 * Primary value with an optional secondary line beneath it (design-system
 * "secondary line" convention). The secondary line is muted, single-line,
 * and truncates with an ellipsis so long content never widens a column.
 */
export function Stacked({
  primary,
  secondary,
  title,
}: {
  primary: ReactNode;
  secondary?: ReactNode;
  /** Full text for the secondary line, shown on hover when it may truncate. */
  title?: string;
}) {
  return (
    <span className="stacked">
      <span className="stacked__primary">{primary}</span>
      {secondary ? (
        <span className="stacked__secondary" title={title}>
          {secondary}
        </span>
      ) : null}
    </span>
  );
}
