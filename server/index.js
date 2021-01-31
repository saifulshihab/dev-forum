import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import 'colors';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import developerRoutes from './routes/DevloperRoutes.js';

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.get('/', (req, res) => {
  res.end('Backend server is running...');
});
app.use('/api/dev', developerRoutes);

// Middleware
app.use(notFound);
app.use(errorHandler);

// Server listening
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(
    `Server listening on port `.blue.bold + `${PORT}`.green.bold.inverse
  );
});
