require('dotenv').config();
var express = require('express');
var cors = require('cors');
var nodemailer = require('nodemailer');
var multer = require('multer');
const app = express();

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: "your-smtp-server",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post('/api/submit-quote', async (request, res) => {
  try {
    const { contactInfo, quoteData, pdfBuffer } = req.body;

    await transporter.sendMail({
      from: '"DUSTUP Quote System" <wetakedustdown@dustup.online>',
      to: "wetakedustdown@dustup.online",
      subject: `Quote Request - ${contactInfo.name}`,
      text: `Quote request from ${contactInfo.name}\nTotal: $${quoteData.total}`,
      attachments: [{
        filename: 'quote.pdf',
        content: pdfData
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