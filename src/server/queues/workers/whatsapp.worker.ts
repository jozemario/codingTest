import { Worker } from "bullmq";
import { CONFIG } from "../config";
import path from "path";

const processor = path.join(__dirname, "whatsapp.processor.ts");
export const worker = new Worker("whatsappQueue", processor, {
  connection: CONFIG().connection,
  concurrency: CONFIG().concurrency,
});

console.log(`whatsappQueue Worker listening for jobs`);
