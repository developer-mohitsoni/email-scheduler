import prisma from "../config/prisma.js";
import { emailQueue } from "../queue/queue.js";

export const scheduleEmail = async (
  to: string,
  subject: string,
  content: string
) => {
  const email = await prisma.email.create({
    data: {
      to,
      subject,
      content,
    },
  });

  await emailQueue.add("sendEmail", {
    to,
    subject,
    content,
  });

  console.log("Add message to queue");

  return email;
};

export const getAllEmails = async () => {
  return await prisma.email.findMany();
};
