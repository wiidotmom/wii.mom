import { execSync } from "node:child_process";

export default () => {
  const commitHash = execSync("git rev-parse --short HEAD")
    .toString().trim();
  const commitMessage = execSync("git log -1 --pretty=%B").toString().trim();

  return {
    commit: {
      hash: commitHash,
      message: commitMessage,
    },
  };
};
