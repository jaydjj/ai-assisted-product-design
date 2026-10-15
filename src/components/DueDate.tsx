import { formatDue, formatShortDate } from '../lib/dates';

/**
 * Due date cell (D-002 revised): the absolute date normally; relative words only when the
 * date is within a week or already past. One line. Never colored (D-003).
 */
export function DueDate({ iso, completed = false }: { iso: string | null; completed?: boolean }) {
  if (!iso) return <span className="due-date due-date--none">No due date</span>;
  if (completed) return <span className="due-date due-date--none">{formatShortDate(iso)}</span>;
  const { text, outsideNorm } = formatDue(iso);
  return (
    <span className={`due-date${outsideNorm ? ' due-date--attention' : ''}`} title={outsideNorm ? formatShortDate(iso) : undefined}>
      {text}
    </span>
  );
}
