import { ProjectTable } from './components/ProjectTable';
import { projects } from './data';

export default function App() {
  return (
    <main className="page">
      <header className="page-header">
        <div className="page-header__eyebrow">Halcyon</div>
        <h1 className="page-header__title">Project Portfolio</h1>
        <p className="page-header__meta">{projects.length} projects</p>
      </header>
      <ProjectTable projects={projects} />
      <footer className="page-footer">
        Build {__BUILD_ID__} · Fictional data for demonstration
      </footer>
    </main>
  );
}
