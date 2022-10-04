//import express, { Request, Response } from "express";
import moment from "moment";

//const router = express.Router();
import { CONFIG } from "./config";
//import IORedis from "ioredis";

import { Queue as QueueMQ, QueueEvents } from "bullmq";
import { createBullBoard } from "@bull-board/api";

import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";

import { queueMQ, inputQueue, outputQueue, whatsappQueue } from "./services";
import { connect } from "http2";

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: [
    new BullMQAdapter(queueMQ),
    new BullMQAdapter(inputQueue),
    new BullMQAdapter(outputQueue),
    new BullMQAdapter(whatsappQueue),
  ],
  serverAdapter: serverAdapter,
});

const setupEventListener = (queueName) => {
  let queueEvents = new QueueEvents(`${queueName}`, {
    connection: CONFIG().connection,
  });
  queueEvents.on("completed", ({ jobId, returnvalue }) => {
    // Called every time a job is completed in any worker.
    console.log({ jobId, returnvalue });
  });

  queueEvents.on("failed", ({ jobId, failedReason }) => {
    // jobId received a progress event
    console.log({ jobId, failedReason });
  });

  queueEvents.on("progress", ({ jobId, data }) => {
    // jobId received a progress event
    console.log({ jobId, data });
  });
  console.log(`${queueName} log queue events started`);
  return queueEvents;
};

const queueEventListeners = ["generalQueue", "whatsappQueue"].map((queueName) =>
  setupEventListener(queueName)
);
console.log(queueEventListeners);

export default serverAdapter;
