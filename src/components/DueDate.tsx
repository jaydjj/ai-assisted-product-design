import { formatRelativeDue, formatShortDate } from '../lib/dates';
import { Stacked } from './Stacked';

/**
 * Due date cell (D-002): relative phrasing first, absolute date beneath.
 * Never colored — urgency is read from the words, not from a status color.
 */
export function DueDate({ iso, completed = false }: { iso: string | null; completed?: boolean }) {
  if (!iso) {
    return <span className="due-date due-date--none">No due date</span>;
  }
  if (completed) {
    // A finished project is never "overdue"; keep the date for reference.
    return <Stacked primary={<span className="due-date">Completed</span>} secondary={`Was due ${formatShortDate(iso)}`} />;
  }
  return (
    <Stacked
      primary={<span className="due-date">{formatRelativeDue(iso)}</span>}
      secondary={formatShortDate(iso)}
    />
  );
}
