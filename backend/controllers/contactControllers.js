// backend/controllers/contactController.js
import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import { generatePDF } from '../utils/pdfGenerator.js';

export const sendContactEmail = async (req, res) => {
  const { name, email, message } = req.body;

  // Path to your email template
  const templatePath = path.join(__dirname, '../templates/contactEmailTemplate.html');
  const template = fs.readFileSync(templatePath, 'utf8');

  // Replace placeholders with actual data
  const htmlContent = template
    .replace('{{name}}', name)
    .replace('{{email}}', email)
    .replace('{{message}}', message);

  // Create transporter
  const transporter = nodemailer.createTransport({
    service: 'Protonmail',
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
        cid: 'logoCid',
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

export const sendQuoteEmail = async (req, res) => {
  const { contactInfo, metrics, conditions } = req.body;

  try {
    // Generate the PDF based on the received data
    const pdfBuffer = await generatePDF(contactInfo, metrics, conditions);

    // Path to your email template
    const templatePath = path.join(__dirname, '../templates/quoteEmailTemplate.html');
    const template = fs.readFileSync(templatePath, 'utf8');

    // Replace placeholders with actual data
    const htmlContent = template
      .replace('{{name}}', contactInfo.name)
      .replace('{{email}}', contactInfo.email)
      .replace('{{phone}}', contactInfo.phone)
      .replace('{{company}}', contactInfo.company);

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'Protonmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options with embedded image and PDF attachment
    const mailOptions = {
      from: contactInfo.email,
      to: 'Services@dustup.online',
      subject: 'New Quote Request',
      html: htmlContent,
      attachments: [
        {
          filename: 'logo.png',
          path: path.join(__dirname, '../assets/logo.png'),
          cid: 'logoCid',
        },
        {
          filename: 'DUSTUP_Quote.pdf',
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Quote email sent successfully!' });
  } catch (error) {
    console.error('Error sending quote email:', error);
    res.status(500).json({ message: 'Failed to send quote email.' });
  }
};