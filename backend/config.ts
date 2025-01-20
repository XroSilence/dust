module.exports = {
  emailService: {
    host: 'SMTP_HO',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'your-email@example.com',
      pass: 'your-email-password'
    }
  },
  emailTemplatePath: './src/templates/QemailTemplate.html'
};