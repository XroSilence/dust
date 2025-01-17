import express from 'express';
const router = express.Router();

// Define your routes here
router.post('/contact', (req, res) => {
  // Handle contact form submission
  res.send('Contact form submitted');
});

export { router };