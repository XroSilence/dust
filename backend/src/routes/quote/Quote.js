const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.post('/quote', (req, res) => {
  const { contactInfo, quoteData } = req.body;

  // Read the email template
  const templatePath = path.join(__dirname, '../../templates/QemailTemplate.html');
  let emailTemplate = fs.readFileSync(templatePath, 'utf8');

  // Replace placeholders with actual data
  emailTemplate = emailTemplate.replace('{{name}}', contactInfo.name);
  emailTemplate = emailTemplate.replace('{{email}}', contactInfo.email);
  emailTemplate = emailTemplate.replace('{{phone}}', contactInfo.phone);
  emailTemplate = emailTemplate.replace('{{company}}', contactInfo.company);
  emailTemplate = emailTemplate.replace('{{message}}', contactInfo.message);
  emailTemplate = emailTemplate.replace('{{quoteData}}', JSON.stringify(quoteData, null, 2));

  // Save the updated template (or send it via email)
  const outputPath = path.join(__dirname, '../output/QemailTemplate.html');
  fs.writeFileSync(outputPath, emailTemplate);

  res.status(200).json({ message: 'Quote submitted successfully' });
});

module.exports = router;