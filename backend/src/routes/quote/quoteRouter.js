import express from 'express';
const router = express.Router();

// Define your routes here
router.post('/quote', (req, res) => {
  const { contactInfo, quoteData } = req.body;
  // Handle quote form submission
  res.send('Quote form submitted');
});

export { router };