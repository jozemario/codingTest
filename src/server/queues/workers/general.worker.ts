import { Worker } from "bullmq";
import { CONFIG } from "../config";
import path from "path";

const processor = path.join(__dirname, "general.processor.ts");
export const worker = new Worker("generalQueue", processor, {
  connection: CONFIG().connection,
  concurrency: CONFIG().concurrency,
});

console.log(`generalQueue Worker listening for jobs`);
