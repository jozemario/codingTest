import { SandboxedJob } from "bullmq";
module.exports = async (job: SandboxedJob) => {
  // Do something with job
  console.log("Processing job: ", job);
};
