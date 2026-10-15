import type { Project } from '../types';
import { getPerson } from '../data';
import { Avatar } from './Avatar';
import { ProgressBar } from './ProgressBar';
import { StatusBadge } from './StatusBadge';
import './ProjectTable.css';

export function ProjectTable({ projects }: { projects: Project[] }) {
  return (
    <div className="project-table">
      <table>
        <thead>
          <tr>
            <th scope="col">Project</th>
            <th scope="col">Owner</th>
            <th scope="col">Status</th>
            <th scope="col">Progress</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => {
            const owner = getPerson(project.ownerId);
            return (
              <tr key={project.id}>
                <th scope="row" className="project-table__name">
                  {project.name}
                </th>
                <td>
                  <span className="project-table__owner">
                    <Avatar name={owner?.name ?? '?'} />
                    {owner?.name ?? 'Unassigned'}
                  </span>
                </td>
                <td>
                  <StatusBadge status={project.status} />
                </td>
                <td>
                  <ProgressBar value={project.progress} label={`${project.name} progress`} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
