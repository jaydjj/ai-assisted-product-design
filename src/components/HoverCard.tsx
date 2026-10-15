import type { ReactNode } from 'react';
import { useId } from 'react';
import './HoverCard.css';

/**
 * Trigger + card shown on hover or keyboard focus. For secondary detail that doesn't earn
 * a place in the row (design-system: "show the exception, not the norm").
 * The trigger must be text that stands alone; the card only adds to it.
 */
export function HoverCard({ trigger, children, className }: { trigger: ReactNode; children: ReactNode; className?: string }) {
  const id = useId();
  return (
    <span className="hover-card">
      <button type="button" className={`hover-card__trigger ${className ?? ''}`} aria-describedby={id}>
        {trigger}
      </button>
      <span role="tooltip" id={id} className="hover-card__card">
        {children}
      </span>
    </span>
  );
}
