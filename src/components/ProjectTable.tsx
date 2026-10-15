import type { Project } from '../types';
import { getPerson } from '../data';
import { formatAge } from '../lib/dates';
import { dependents, oldestOpenBlockerAge, openBlockers, sortForPortfolio } from '../lib/signals';
import { Avatar } from './Avatar';
import { DueDate } from './DueDate';
import { ProgressBar } from './ProgressBar';
import { Stacked } from './Stacked';
import { StatusBadge } from './StatusBadge';
import './ProjectTable.css';

/** Secondary line under the project name: critical priority, open blockers, downstream dependents. */
function attentionLine(project: Project, all: Project[]): { text: string; title: string } | null {
  const parts: string[] = [];
  const titles: string[] = [];
  // Priority drives the default order; name it only at the top so readers see why a row is first.
  if (project.priority === 'critical' && project.status !== 'completed') parts.push('Critical');
  const blockers = openBlockers(project);
  if (blockers.length > 0) {
    const age = oldestOpenBlockerAge(project);
    parts.push(`${blockers.length} ${blockers.length === 1 ? 'blocker' : 'blockers'} · oldest ${age}d`);
    titles.push(...blockers.map((b) => `Blocker: ${b.title}`));
  }
  const deps = dependents(project, all);
  if (deps.length > 0) {
    parts.push(`Blocks ${deps.length}`);
    titles.push(`Blocks: ${deps.map((d) => d.name).join(', ')}`);
  }
  if (parts.length === 0) return null;
  return { text: parts.join(' · '), title: titles.join('\n') };
}

export function ProjectTable({ projects }: { projects: Project[] }) {
  const rows = sortForPortfolio(projects);
  return (
    <div className="project-table">
      <table>
        <thead>
          <tr>
            <th scope="col">Project</th>
            <th scope="col">Owner</th>
            <th scope="col">Status</th>
            <th scope="col">Progress</th>
            <th scope="col">Due</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((project) => {
            const owner = getPerson(project.ownerId);
            const attention = attentionLine(project, projects);
            return (
              <tr key={project.id}>
                <th scope="row" className="project-table__name">
                  <Stacked
                    primary={project.name}
                    secondary={attention?.text}
                    title={attention?.title}
                  />
                </th>
                <td>
                  <span className="project-table__owner">
                    <Avatar name={owner?.name ?? '?'} />
                    <span className="project-table__owner-name">{owner?.name ?? 'Unassigned'}</span>
                  </span>
                </td>
                <td>
                  <Stacked
                    primary={<StatusBadge status={project.status} />}
                    secondary={`Updated ${formatAge(project.statusUpdatedOn)}`}
                  />
                </td>
                <td>
                  <ProgressBar value={project.progress} label={`${project.name} progress`} />
                </td>
                <td className="project-table__due">
                  <DueDate iso={project.dueDate} completed={project.status === 'completed'} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
