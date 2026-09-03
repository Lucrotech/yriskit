import { spawnSync } from "node:child_process";

const result = spawnSync("npx", ["wrangler", "deploy"], {
  stdio: "inherit",
  shell: true,
  env: {
    ...process.env,
    OPEN_NEXT_DEPLOY: "true",
  },
});

process.exit(result.status ?? 1);
