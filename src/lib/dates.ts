/**
 * Fixed reference date for the dataset. The data describes a moment in time,
 * so "today" must not drift with the real clock or the demo changes every day.
 */
export const TODAY = new Date('2026-10-15T12:00:00Z');

const DAY = 86_400_000;

export function daysUntil(iso: string, from: Date = TODAY): number {
  return Math.round((new Date(`${iso}T12:00:00Z`).getTime() - from.getTime()) / DAY);
}

export function daysSince(iso: string, from: Date = TODAY): number {
  return -daysUntil(iso, from);
}

/** "Oct 18" or "Jan 29, 2027" when the year differs from the reference date. */
export function formatShortDate(iso: string, from: Date = TODAY): string {
  const d = new Date(`${iso}T12:00:00Z`);
  const sameYear = d.getUTCFullYear() === from.getUTCFullYear();
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
    ...(sameYear ? {} : { year: 'numeric' }),
  });
}

/**
 * Relative phrasing for due dates (D-002). Capped beyond 90 days either way so the
 * text stays short; the absolute date is always shown alongside it.
 */
export function formatRelativeDue(iso: string, from: Date = TODAY): string {
  const n = daysUntil(iso, from);
  if (n === 0) return 'Due today';
  if (n < 0) {
    const late = -n;
    if (late > 90) return 'Overdue';
    return `${late} ${late === 1 ? 'day' : 'days'} overdue`;
  }
  if (n > 90) {
    const months = Math.round(n / 30);
    return `Due in ${months} ${months === 1 ? 'month' : 'months'}`;
  }
  if (n < 14) return `Due in ${n} ${n === 1 ? 'day' : 'days'}`;
  const weeks = Math.round(n / 7);
  return `Due in ${weeks} ${weeks === 1 ? 'week' : 'weeks'}`;
}

/** "today", "yesterday", "18d ago" — for secondary lines. */
export function formatAge(iso: string, from: Date = TODAY): string {
  const n = daysSince(iso, from);
  if (n <= 0) return 'today';
  if (n === 1) return 'yesterday';
  return `${n}d ago`;
}
