import type { Status } from '../types';
import './StatusBadge.css';

export const STATUS_LABELS: Record<Status, string> = {
  on_track: 'On track',
  at_risk: 'At risk',
  off_track: 'Off track',
  on_hold: 'On hold',
  completed: 'Completed',
};

/** Shows a project's self-reported status. Always pairs color with a text label. */
export function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`status-badge status-badge--${status}`}>
      <span className="status-badge__dot" aria-hidden="true" />
      {STATUS_LABELS[status]}
    </span>
  );
}
