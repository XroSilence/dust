import * as dotenv from "dotenv";
dotenv.config();
import express, { Express } from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import multer from "multer";

const app: Express = express();
app.use(
  cors({
    origin: "http://localhost:3000", // Update with your frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage });

const transporter = nodemailer.createTransport({
  host: "127.0.0.1",
  port: 1025,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    await transporter.sendMail({
      from: '"Contact" <dustup_official@pm.me>',
      to: "wetakedustdown@dustup.online",
      subject: `Contact from ${name}`,
      text: `Email: ${email}\nMessage: ${message}`,
    });
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

app.post(
  "/api/submit-quote",
  upload.single("pdf"),
  async (req, res): Promise<void> => {
    try {
      if (!req.file) {
        res.status(400).json({ error: "No PDF file uploaded" });
        return;
      }
      const { contactInfo, quoteData } = req.body;
      await transporter.sendMail({
        from: '"Quote" <dustup_official@pm.me>',
        to: "wetakedustdown@dustup.online",
        subject: `Quote from ${contactInfo.name}`,
        text: `Total: $${quoteData.total}`,
        attachments: [{ filename: "quote.pdf", content: req.file.buffer }],
      });
      res.json({ success: true });
      return;
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Unable to send quote" });
      return;
    }
  }
);

app.listen(3001, () => console.log("Server listening on port 3001"));

export default app;
