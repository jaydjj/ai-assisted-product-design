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

/** Days either side of today within which a due date is "outside the norm" (D-002, revised). */
export const DUE_ATTENTION_WINDOW = 7;

/**
 * Due date text (D-002, revised): the absolute date normally; relative phrasing only when
 * the date is within DUE_ATTENTION_WINDOW days or already past.
 */
export function formatDue(iso: string, from: Date = TODAY): { text: string; outsideNorm: boolean } {
  const n = daysUntil(iso, from);
  if (n < 0) {
    const late = -n;
    return { text: late > 90 ? 'Overdue' : `${late} ${late === 1 ? 'day' : 'days'} overdue`, outsideNorm: true };
  }
  if (n === 0) return { text: 'Due today', outsideNorm: true };
  if (n <= DUE_ATTENTION_WINDOW) return { text: `Due in ${n} ${n === 1 ? 'day' : 'days'}`, outsideNorm: true };
  return { text: formatShortDate(iso, from), outsideNorm: false };
}

/** Status older than this is shown as stale (D-004, revised). A policy value, not a visual one. */
export const STALE_STATUS_DAYS = 14;

/** "today", "yesterday", "18d ago" — for secondary lines. */
export function formatAge(iso: string, from: Date = TODAY): string {
  const n = daysSince(iso, from);
  if (n <= 0) return 'today';
  if (n === 1) return 'yesterday';
  return `${n}d ago`;
}
