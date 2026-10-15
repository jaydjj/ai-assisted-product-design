import { ProjectTable } from './components/ProjectTable';
import { projects } from './data';
import { TODAY, formatShortDate } from './lib/dates';
import { stressProjects } from './lib/stress';

const asOf = formatShortDate(TODAY.toISOString().slice(0, 10));
const isStress = new URLSearchParams(window.location.search).has('stress');
const data = isStress ? stressProjects(projects) : projects;

export default function App() {
  return (
    <main className="page">
      <header className="page-header">
        <div className="page-header__eyebrow">Halcyon</div>
        <h1 className="page-header__title">Project Portfolio</h1>
        <p className="page-header__meta">{data.length} projects · as of {asOf}{isStress ? ' · stress data' : ''}</p>
      </header>
      <ProjectTable projects={data} />
      <footer className="page-footer">
        Build {__BUILD_ID__} · Fictional data for demonstration · <a href="docs/plan.html">Plan Build {__BUILD_ID__} · Fictional data for demonstrationamp; docs</a>
      </footer>
    </main>
  );
}
