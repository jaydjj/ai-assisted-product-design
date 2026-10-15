import type { Project } from '../types';
import { getPerson } from '../data';
import { STALE_STATUS_DAYS, daysSince, formatAge } from '../lib/dates';
import { dependents, oldestOpenBlockerAge, openBlockers, sortForPortfolio } from '../lib/signals';
import { Avatar } from './Avatar';
import { DueDate } from './DueDate';
import { HoverCard } from './HoverCard';
import { ProgressStatus } from './ProgressStatus';
import { Stacked } from './Stacked';
import './ProjectTable.css';

/**
 * Secondary line under the project name: the open-blocker count only. Red when the project is
 * critical priority (D-006). Everything else (titles, age, dependents) lives in the hover card.
 */
function BlockerLine({ project, all }: { project: Project; all: Project[] }) {
  const blockers = openBlockers(project);
  if (blockers.length === 0) return null;
  const critical = project.priority === 'critical';
  const age = oldestOpenBlockerAge(project);
  const deps = dependents(project, all);
  return (
    <HoverCard
      className={`blocker-count${critical ? ' blocker-count--critical' : ''}`}
      trigger={
        <>
          {blockers.length} {blockers.length === 1 ? 'blocker' : 'blockers'}
          {critical ? <span className="visually-hidden"> on a critical project</span> : null}
        </>
      }
    >
      <span className="hover-card__heading">Open blockers · oldest {age}d</span>
      <ul className="hover-card__list">
        {blockers.map((b) => (
          <li key={b.id}>
            {b.title} <span className="hover-card__meta">· {daysSince(b.openedOn)}d</span>
          </li>
        ))}
      </ul>
      {deps.length > 0 ? (
        <>
          <span className="hover-card__heading">Blocks {deps.length}</span>
          <ul className="hover-card__list">
            {deps.map((d) => (
              <li key={d.id}>{d.name}</li>
            ))}
          </ul>
        </>
      ) : null}
    </HoverCard>
  );
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
            <th scope="col">Progress</th>
            <th scope="col">Due</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((project) => {
            const owner = getPerson(project.ownerId);
            const statusAge = daysSince(project.statusUpdatedOn);
            const stale = statusAge > STALE_STATUS_DAYS && project.status !== 'completed';
            return (
              <tr key={project.id}>
                <th scope="row" className="project-table__name">
                  <Stacked primary={project.name} secondary={<BlockerLine project={project} all={projects} />} />
                </th>
                <td>
                  <span className="project-table__owner">
                    <Avatar name={owner?.name ?? '?'} />
                    <span className="project-table__owner-name">{owner?.name ?? 'Unassigned'}</span>
                  </span>
                </td>
                <td>
                  <Stacked
                    primary={<ProgressStatus value={project.progress} status={project.status} label={`${project.name} progress`} />}
                    secondary={stale ? `Status updated ${formatAge(project.statusUpdatedOn)}` : undefined}
                  />
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
