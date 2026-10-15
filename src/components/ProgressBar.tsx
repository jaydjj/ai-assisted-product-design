import './ProgressBar.css';

/** Horizontal bar with a visible percentage. `label` names what is being measured for screen readers. */
export function ProgressBar({ value, label }: { value: number; label: string }) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className="progress">
      <div
        className="progress__track"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clamped}
      >
        <div className="progress__fill" style={{ width: `${clamped}%` }} />
      </div>
      <span className="progress__value">{clamped}%</span>
    </div>
  );
}
