import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { router as contactRouter } from './src/routes/contact/contactRouter.js';
import { router as quoteRouter } from './src/routes/quote/quoteRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../../dist')));

// Use the contact router
app.use('/api/contact', contactRouter);

// Use the quote router
app.use('/api/quote', quoteRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});