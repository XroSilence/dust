import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import multer from 'multer';

var app = express();
app.use(cors());
app.use(express.json());

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

var transporter = nodemailer.createTransport({
  host: "127.0.0.1",
  port: 1025,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post('/api/submit-quote', upload.single('pdf'), 
  async (req, res) => {
  try {
    const { contactInfo, quoteData } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: 'PDF file is required' });
    }
    const pdfBuffer = req.file.buffer;

    await transporter.sendMail({
      from: '"DUSTUP Quote System" <weTakeDustDown@dustup.online>',
      to: "weTakeDustDown@dustup.online",
      subject: `Quote Request - ${contactInfo.name}`,
      text: `Quote request from ${contactInfo.name}\nTotal: $${quoteData.total}`,
      attachments: [{
        filename: 'quote.pdf',
        content: pdfBuffer
      }]
    });

    await res.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    await res.status(500).json({ error: 'Failed to send email' });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    await transporter.sendMail({
      from: '"DUSTUP Contact Form" <weTakeDustDown@dustup.online>',
      to: "weTakeDustDown@dustup.online",
      subject: `Contact Form Submission - ${name}`,
      text: `Message from ${name} (${email}):\n\n${message}`
    });

    await res.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    await res.status(500).json({ error: 'Failed to send email' });
  }
});

app.listen(1025, () => {
  console.log('Server running on port 1025');
});