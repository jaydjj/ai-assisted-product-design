import type { Blocker, Priority, Project } from '../types';
import { daysSince, daysUntil } from './dates';

export function openBlockers(project: Project): Blocker[] {
  return project.blockers.filter((b) => b.resolvedOn === null);
}

/** Age in days of the oldest open blocker, or null when none are open. */
export function oldestOpenBlockerAge(project: Project): number | null {
  const open = openBlockers(project);
  if (open.length === 0) return null;
  return Math.max(...open.map((b) => daysSince(b.openedOn)));
}

/** Projects that list this one as a dependency. */
export function dependents(project: Project, all: Project[]): Project[] {
  return all.filter((p) => p.dependsOn.includes(project.id));
}

const PRIORITY_RANK: Record<Priority, number> = { critical: 0, high: 1, medium: 2, low: 3 };

/**
 * Default portfolio order (D-003): completed projects last; then priority;
 * then nearest due date, with undated projects after dated ones.
 */
export function sortForPortfolio(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    const doneA = a.status === 'completed' ? 1 : 0;
    const doneB = b.status === 'completed' ? 1 : 0;
    if (doneA !== doneB) return doneA - doneB;
    const pr = PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority];
    if (pr !== 0) return pr;
    const da = a.dueDate ? daysUntil(a.dueDate) : Number.POSITIVE_INFINITY;
    const db = b.dueDate ? daysUntil(b.dueDate) : Number.POSITIVE_INFINITY;
    return da - db;
  });
}
