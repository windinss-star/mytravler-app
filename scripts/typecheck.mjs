import { access } from 'node:fs/promises';

await access(new URL('../apps/in-toss-app/bedrock.config.ts', import.meta.url));
await access(new URL('../apps/in-toss-app/src/app/index.js', import.meta.url));
