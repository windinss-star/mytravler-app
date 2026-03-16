import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const repoRoot = fileURLToPath(new URL('..', import.meta.url));
const shell = process.env.ComSpec ?? 'C:\\Windows\\System32\\cmd.exe';

for (const command of [
  'npm.cmd run lint',
  'npm.cmd run typecheck',
  'npm.cmd run test',
]) {
  const result = spawnSync(shell, ['/d', '/s', '/c', command], {
    cwd: repoRoot,
    stdio: 'inherit',
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}
