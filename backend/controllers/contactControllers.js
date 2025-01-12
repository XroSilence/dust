// backend/controllers/contactController.js
import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';

export const sendContactEmail = async (req, res) => {
  const { name, email, message } = req.body;

  // Path to your email template
  const templatePath = path.join(__dirname, '../templates/emailTemplate.html');
  const template = fs.readFileSync(templatePath, 'utf8');

  // Replace placeholders with actual data
  const htmlContent = template
    .replace('{{name}}', name)
    .replace('{{email}}', email)
    .replace('{{message}}', message);

  // Create transporter
  const transporter = nodemailer.createTransport({
    service: 'Protonmail', // or any other email service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email options with embedded image
  const mailOptions = {
    from: email,
    to: 'Services@dustup.online',
    subject: 'New Contact Form Submission',
    html: htmlContent,
    attachments: [
      {
        filename: 'logo.png',
        path: path.join(__dirname, '../assets/logo.png'),
        cid: 'logoCid', // Same as the `cid` in the HTML img src
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email.' });
  }
};