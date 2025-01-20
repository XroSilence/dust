import express, { Request, Response } from 'express';
import cors from 'cors';
import { config } from 'dotenv';

config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Type-safe request handling
interface TodoRequest {
  title: string;
  completed: boolean;
}

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? 'https://dustup.online'
    : 'http://localhost:5173',
  credentials: true
}));

// Routes with TypeScript
app.post('/api/todos', async (req: Request<{}, {}, TodoRequest>, res: Response) => {
  try {
    const { title, completed } = req.body;
    // Your logic here
    res.json({ success: true, data: { title, completed } });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});