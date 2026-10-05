import { inngest } from "../client.js";
import { fetchRepoFiles } from "../../service/github.js";
import { chunkFiles } from "../../service/chunker.js";
import { saveChunks } from "../../service/vectorStore.js";

export const indexRepo = inngest.createFunction(
  {
    id: "index-repo",
    triggers: [{ event: "repo/index.requested" }],
  },
  async ({ event, step }) => {
    // jobs they provide

    const { githubToken, owner, repo } = event.data;

    const repoName = repo?.replace(/\.git$/, "");

    if (!repoName) {
      throw new Error("Repository name is missing from event.data");
    }

    const repoKey = `${owner}/${repoName}`;

    const files = await step.run("fetch-github-files", async () => {
      return fetchRepoFiles(githubToken, owner, repoName);
    });

    const documents = await step.run("chunk-files", async () => {
      return chunkFiles(files, repoKey);
    });

    const saveResult = await step.run("save-to-pinecone", async () => {
      return await saveChunks(repoKey, documents);
    });

    return {
      repo: repoKey,
      fileCount: files.length,
      chunkCount: documents.length,
      saved: saveResult,
    };
  }
);