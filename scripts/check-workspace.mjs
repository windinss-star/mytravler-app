import { readFileSync } from 'node:fs';

const pkg = JSON.parse(
  readFileSync(new URL('../package.json', import.meta.url), 'utf8'),
);

if (!pkg.workspaces && pkg.packageManager == null) {
  throw new Error('workspace metadata missing');
}
