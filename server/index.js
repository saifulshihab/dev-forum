import express from 'express';
import path from 'path';
import http from 'http';
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
import circularRoutes from './routes/CircularRoutes.js';
import chatRoutes from './routes/ChatRoutes.js';
import { Server } from 'socket.io';
import { addUser, getUser } from './socket/chat.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});
io.on('connection', (socket) => {
  socket.on('join', ({ name, room }) => {
    const { user } = addUser({ id: socket.id, name, room });

    socket.join(user.room);

    // socket.emit('message', {
    //   user: 'Admin',
    //   text: `${user.name}, welcome to the ${room}`,
    // });

    // socket.broadcast
    //   .to(user.room)
    //   .emit('message', { user: 'admin', text: `${user.name} has joined` });
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    if (user) {
      io.to(user.room).emit('message', { user: user.name, text: message });
    }
    callback();
  });
});

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
app.use('/api/circular', circularRoutes);
app.use('/api/chat', chatRoutes);

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
server.listen(PORT, () => {
  console.log(
    `Server listening on port `.blue.bold + `${PORT}`.green.bold.inverse
  );
});
