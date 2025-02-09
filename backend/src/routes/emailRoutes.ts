import { Router, Application, Request, Response } from "express";
import { scheduleEmail, getAllEmails } from "../services/emailService.js";

const router: Router = Router();

router.post("/schedule-email", async (req: Request, res: Response) => {
  const { to, subject, content } = req.body;
  const email = await scheduleEmail(to, subject, content);

  console.log(email);
  res.json({ message: "Email scheduled", email });
});

router.get("/emails", async (_, res: Response) => {
  const emails = await getAllEmails();
  res.json(emails);
});

export default router;
