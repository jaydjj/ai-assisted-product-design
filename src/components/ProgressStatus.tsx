import type { Status } from '../types';
import { STATUS_LABELS } from './StatusBadge';
import './ProgressStatus.css';

/**
 * Progress and status in one cell (D-007): the bar is colored by the self-reported status
 * and the status word sits beside the percentage, so color is never the only signal.
 */
export function ProgressStatus({ value, status, label }: { value: number; status: Status; label: string }) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className={`progress-status progress-status--${status}`}>
      <div className="progress-status__row">
        <span className="progress-status__value">{clamped}%</span>
        <span className="progress-status__status">{STATUS_LABELS[status]}</span>
      </div>
      <div
        className="progress-status__track"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clamped}
        aria-valuetext={`${clamped}%, ${STATUS_LABELS[status]}`}
      >
        <div className="progress-status__fill" style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
}
