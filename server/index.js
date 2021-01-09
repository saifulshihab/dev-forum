import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import 'colors';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();

app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.end('Backend server is running...');
});

// Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(notFound);
app.use(errorHandler);

// Server listening
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(
    `Server listening on port `.blue.bold + `${PORT}`.green.bold.inverse
  );
});
