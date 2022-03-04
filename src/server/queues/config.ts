export function CONFIG() {
  return {
    queueName: process.env.QUEUE_NAME || "generalQueue",
    concurrency: parseInt(process.env.QUEUE_CONCURRENCY || "1"),
    connection: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT), //|| "6379"),
      connectTimeout: 10000,
    },
    //region: process.env.AWS_DEFAULT_REGION || "us-west-2",
    smtp: {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : void 0,
      secure: true, // upgrade later with STARTTLS
      auth: {
        user: process.env.SMTP_AUTH_USER,
        pass: process.env.SMTP_AUTH_PASS,
      },
    },
  };
}
