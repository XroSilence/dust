const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const multer = require('multer');
const app = express();

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: "your-smtp-server",
  port: 587,
  secure: false,
  auth: {
    user: "wetakedustdown@dustup.online",
    pass: "your-email-password"
  }
});

app.post('/api/submit-quote', async (req, res) => {
  try {
    const { contactInfo, quoteData, pdfBuffer } = req.body;

    await transporter.sendMail({
      from: '"DUSTUP Quote System" <wetakedustdown@dustup.online>',
      to: "wetakedustdown@dustup.online",
      subject: `Quote Request - ${contactInfo.name}`,
      text: `Quote request from ${contactInfo.name}\nTotal: $${quoteData.total}`,
      attachments: [{
        filename: 'quote.pdf',
        content: pdfBuffer
      }]
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});