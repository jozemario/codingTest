import { Queue as QueueMQ } from "bullmq";
import { CONFIG } from "./config";
const connection = { connection: CONFIG().connection };

export const inputQueue = new QueueMQ("inputQueue", connection);
export const outputQueue = new QueueMQ("outputQueue", connection);
export const whatsappQueue = new QueueMQ("whatsappQueue", connection);
export const queueMQ = new QueueMQ("generalQueue", connection);
