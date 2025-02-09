import { Worker } from "bullmq";
import nodemailer from "nodemailer";
import "dotenv/config";

const auth = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

new Worker(
  "emailQueue",
  async (job) => {
    try {
      const { to, subject, content } = job.data;

      await auth.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        text: content,
      });

      console.log(`✅ Email sent to ${to}`);
    } catch (error) {
      console.error("❌ Error sending email:", error);
    }
  },
  {
    connection: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT as string),
    },
  }
);
