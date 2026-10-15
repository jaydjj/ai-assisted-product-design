import type { Activity, Person, Project } from './types';
import projectsJson from './data/projects.json';
import peopleJson from './data/people.json';
import activityJson from './data/activity.json';

export const projects = projectsJson as Project[];
export const people = peopleJson as Person[];
export const activity = activityJson as Activity[];

const peopleById = new Map(people.map((p) => [p.id, p]));

export function getPerson(id: string): Person | undefined {
  return peopleById.get(id);
}
