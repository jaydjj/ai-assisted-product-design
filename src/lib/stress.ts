import type { Project } from '../types';

/**
 * Returns a messier version of the dataset for layout testing (append `?stress` to the URL).
 * Long names, many blockers, far-off and long-overdue dates, many dependents. Not for the demo narrative.
 */
export function stressProjects(projects: Project[]): Project[] {
  const copy: Project[] = JSON.parse(JSON.stringify(projects));
  const blocker = (i: number) => ({
    id: `sb${i}`,
    title: `Stress blocker ${i}: waiting on an external vendor to confirm a long and detailed requirement`,
    ownerId: 'u01',
    openedOn: '2026-04-01',
    resolvedOn: null,
  });
  copy[0].name = 'Billing Platform Migration — Phase 2 (EMEA, APAC and LATAM entities, incl. tax)';
  copy[0].blockers = Array.from({ length: 12 }, (_, i) => blocker(i));
  copy[1].name = 'Mobile Checkout Redesign for iOS, Android and Progressive Web App';
  copy[1].dueDate = '2025-11-01'; // ~1 year overdue
  copy[2].dueDate = '2027-12-31'; // far future
  copy[3].statusUpdatedOn = '2026-03-01'; // very stale
  for (let i = 4; i < 12; i++) copy[i].dependsOn = [copy[0].id, copy[2].id];
  return copy;
}
