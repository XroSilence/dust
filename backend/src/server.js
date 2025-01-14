import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "1025"),
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const loadEmailTemplate = (templateName, replacements) => {
  const templatePath = path.join(__dirname, `../templates/${templateName}.html`);
  let template = fs.readFileSync(templatePath, 'utf8');
  for (const key in replacements) {
    template = template.replace(new RegExp(`{{${key}}}`, 'g'), replacements[key]);
  }
  return template;
};

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const emailContent = loadEmailTemplate('CemailTemplate', {
      name,
      email,
      message,
    });

    await transporter.sendMail({
      from: '"Contact" <dustup_official@pm.me>',
      to: 'wetakedustdown@dustup.online',
      subject: `Contact from ${name}`,
      html: emailContent,
    });

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to submit contact info' });
  }
});

app.post('/api/quote', async (req, res) => {
  try {
    const { contactInfo, quoteData } = req.body;

    const emailContent = loadEmailTemplate('QemailTemplate', {
      ...contactInfo,
      ...quoteData,
    });

    await transporter.sendMail({
      from: '"Quote" <dustup_official@pm.me>',
      to: 'wetakedustdown@dustup.online',
      subject: `Quote from ${contactInfo.name}`,
      html: emailContent,
    });

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send quote email' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));