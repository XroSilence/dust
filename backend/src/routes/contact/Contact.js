const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Read the email template
  const templatePath = path.join(__dirname, '../../templates/CemailTemplate.html');
  let emailTemplate = fs.readFileSync(templatePath, 'utf8');

  // Replace placeholders with actual data
  emailTemplate = emailTemplate.replace('{{name}}', name);
  emailTemplate = emailTemplate.replace('{{email}}', email);
  emailTemplate = emailTemplate.replace('{{message}}', message);

  // Save the updated template (or send it via email)
  const outputPath = path.join(__dirname, '../output/CemailTemplate.html');
  fs.writeFileSync(outputPath, emailTemplate);

  res.status(200).json({ message: 'Contact form submitted successfully' });
});

module.exports = router;