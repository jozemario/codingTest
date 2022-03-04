import { Worker, QueueEvents } from "bullmq";

class Subscriber {
  private _serviceName: string;
  private _listenerName: string;
  private _queueEvent: QueueEvents;
  constructor(options = { serviceName: "", listenerName: "" }) {
    this._serviceName = options.serviceName;
    this._listenerName = options.listenerName;
    this._queueEvent = new QueueEvents(this._serviceName);
  }

  _worker() {
    new Worker(
      this._serviceName,
      async (job) => {
        if (job.name == this._listenerName) {
          this._queueEvent.emit(
            this._listenerName,
            JSON.stringify({ data: job.data })
          );
          return job.name;
        }
      },
      { limiter: { duration: 3000, max: 25 } }
    );
  }

  _notifications() {
    this._worker();
    this._queueEvent.on("completed", (job) =>
      console.info(`${this._listenerName} completed ${job.jobId}`)
    );
    this._queueEvent.on("waiting", (job) =>
      console.info(`${this._listenerName} waiting ${job.jobId}`)
    );
    this._queueEvent.on("active", (job) =>
      console.info(`${this._listenerName} active ${job.jobId}`)
    );
    this._queueEvent.on("failed", (job) =>
      console.error(`${this._listenerName} failed ${job.jobId}`)
    );
  }

  listener() {
    this._notifications();
    return new Promise((resolve, _) => {
      this._queueEvent.once(this._listenerName, async (data) => {
        resolve(JSON.parse(data).data);
      });
    });
  }
}

module.exports = { Subscriber };
