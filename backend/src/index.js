const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
// Import and use the contact route
const quoteRoute = require('./routes/quote/Quote');
app.use('/api', quoteRoute);

// Import and use the contact route
const contactRoute = require('./routes/contact/Contact');
app.use('/api', contactRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});