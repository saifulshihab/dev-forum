import express from 'express';
import path from 'path';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import 'colors';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import developerRoutes from './routes/DevloperRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import articleRoutes from './routes/ArticleRoutes.js';
import questionRoutes from './routes/QuestionRoutes.js';
import recruiterRoutes from './routes/RecruiterRoutes.js';
import projectRoutes from './routes/ProjectRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.get('/', (req, res) => {
  res.end('Backend server is running...');
});
app.use(express.urlencoded({ extended: false }));
app.use('/api/dev', developerRoutes);
app.use('/upload', uploadRoutes);
app.use('/api/article', articleRoutes);
app.use('/api/question', questionRoutes);
app.use('/api/recruiter', recruiterRoutes);
app.use('/api/project', projectRoutes);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  '/server/uploads',
  express.static(path.join(__dirname, '/server/uploads'))
);

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
