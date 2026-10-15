// Renders docs/*.md to public/docs/*.html so the living documentation ships with the app.
// Runs before `vite build`. Output is gitignored; the markdown stays the source of truth.
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { marked } from 'marked';

const ORDER = ['plan', 'opportunities', 'design-system', 'decisions', 'demo-notes'];
const files = readdirSync('docs').filter((f) => f.endsWith('.md'));
const names = [...ORDER.filter((n) => files.includes(`${n}.md`)), ...files.map((f) => f.replace('.md', '')).filter((n) => !ORDER.includes(n))];
const tokens = readFileSync('src/tokens.css', 'utf8');

const nav = (current) =>
  names.map((n) => `<a href="./${n}.html"${n === current ? ' aria-current="page"' : ''}>${n.replace('-', ' ')}</a>`).join('');

const page = (name, body) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${name} · Halcyon docs</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
${tokens}
*{box-sizing:border-box}
body{margin:0;font-family:var(--font-family);font-size:var(--font-size-md);line-height:var(--line-height-normal);color:var(--color-text);background:var(--color-bg);-webkit-font-smoothing:antialiased}
.wrap{max-width:760px;margin:0 auto;padding:var(--space-6) var(--space-5) var(--space-7)}
nav{display:flex;flex-wrap:wrap;gap:var(--space-2);margin-bottom:var(--space-6);font-size:var(--font-size-xs);text-transform:uppercase;letter-spacing:var(--tracking-caps)}
nav a{color:var(--color-text-muted);text-decoration:none;padding:4px 10px;border-radius:var(--radius-pill);box-shadow:var(--ring-hairline);background:var(--color-surface)}
nav a[aria-current]{color:var(--color-text);background:var(--color-surface-muted)}
nav a.app{margin-left:auto;color:var(--color-accent)}
h1{font-size:var(--font-size-xl);font-weight:var(--font-weight-semibold);letter-spacing:var(--tracking-tight);margin:0 0 var(--space-4)}
h2{font-size:var(--font-size-lg);font-weight:var(--font-weight-semibold);letter-spacing:var(--tracking-tight);margin:var(--space-6) 0 var(--space-3);padding-top:var(--space-5);border-top:1px solid var(--color-border)}
h3{font-size:var(--font-size-md);font-weight:var(--font-weight-semibold);margin:var(--space-5) 0 var(--space-2)}
p,ul,ol{margin:0 0 var(--space-3)} li{margin-bottom:var(--space-1)}
blockquote{margin:0 0 var(--space-4);padding:var(--space-3) var(--space-4);background:var(--color-surface);box-shadow:var(--ring-hairline);border-radius:var(--radius-md);color:var(--color-text-muted);font-size:var(--font-size-sm)}
code{font-family:var(--font-family-mono);font-size:0.85em;background:var(--color-surface-muted);padding:1px 5px;border-radius:var(--radius-sm)}
table{width:100%;border-collapse:collapse;font-size:var(--font-size-sm);margin:0 0 var(--space-4);background:var(--color-surface);box-shadow:var(--ring-hairline);border-radius:var(--radius-md)}
th,td{text-align:left;padding:var(--space-2) var(--space-3);vertical-align:top;border-top:1px solid var(--color-border-subtle)}
th{font-size:var(--font-size-xs);text-transform:uppercase;letter-spacing:var(--tracking-caps);color:var(--color-text-muted);border-top:0}
hr{border:0;border-top:1px solid var(--color-border);margin:var(--space-6) 0}
a{color:var(--color-accent)}
em{color:var(--color-text-muted)}
</style></head><body><div class="wrap">
<nav>${nav(name)}<a class="app" href="../">← App</a></nav>
${body}
</div></body></html>`;

mkdirSync('public/docs', { recursive: true });
for (const n of names) {
  const md = readFileSync(`docs/${n}.md`, 'utf8');
  writeFileSync(`public/docs/${n}.html`, page(n, marked.parse(md)));
}
writeFileSync('public/docs/index.html', page('plan', '<meta http-equiv="refresh" content="0;url=./plan.html">'));
console.log(`docs: ${names.join(', ')}`);
