import { Router } from "express";
import { inngest } from "../inngest/client.js";
// import { createJob, getJob } from "../jobs/jobStore.js";  //not need bcz we not pooling 
import { parseRepo } from "../service/github.js";

const router = Router();

router.post("/", async (req, res) => {
  const githubToken = req.githubToken || process.env.GITHUB_TOKEN;
  const { owner, repo, repoKey } = parseRepo(req.body.repo);
//   const job = createJob(repoKey);
  await inngest.send({
    name: "repo/index.requested",
    data: {
    //   jobId: job.jobId,
      githubToken,
      owner,
      repo,
      repoKey,
    },
  });

  res.json("repo-Indexing");
});

export default router;