import { Queue } from "bullmq";
import "dotenv/config";

export const emailQueue = new Queue("emailQueue", {
  connection: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT as string),
  },
});
