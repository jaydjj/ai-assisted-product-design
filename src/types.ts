export type Status = 'on_track' | 'at_risk' | 'off_track' | 'on_hold' | 'completed';
export type Priority = 'critical' | 'high' | 'medium' | 'low';

export interface Person {
  id: string;
  name: string;
  role: string;
  team: string;
}

export interface Blocker {
  id: string;
  title: string;
  ownerId: string;
  openedOn: string;
  resolvedOn: string | null;
}

export interface Project {
  id: string;
  name: string;
  summary: string;
  ownerId: string;
  teamIds: string[];
  /** Self-reported by the project owner. */
  status: Status;
  /** Self-reported percent complete (0–100). */
  progress: number;
  priority: Priority;
  startDate: string;
  dueDate: string | null;
  statusUpdatedOn: string;
  dependsOn: string[];
  tasks: { total: number; completed: number };
  /** Tasks completed per week, oldest first, last six weeks. */
  weeklyCompleted: number[];
  blockers: Blocker[];
}

export interface Activity {
  id: string;
  projectId: string;
  date: string;
  actorId: string;
  type: 'status_update' | 'status_change' | 'blocker_opened' | 'blocker_resolved' | 'comment';
  message: string;
}
