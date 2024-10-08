// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Routers 
import postsRouter from './routes/posts.js';
import generateRouter from './routes/generate.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true,
}));
app.use(express.json());

// API Routes
app.use('/api/posts', postsRouter);
app.use('/api/generate', generateRouter);

mongoose.set('debug', true);

// Logging the Connection URI (Excluding Password) - Hide the password for security
const uriParts = process.env.MONGODB_URI.split(':');
const uriWithoutPassword = `${uriParts[0]}:${uriParts[1]}:******@${uriParts[3]}`;
console.log('MongoDB Connection URI:', uriWithoutPassword);

// Mongoose Connection
mongoose.connect(process.env.MONGODB_URI, {
  tls: true,
  tlsAllowInvalidCertificates: false,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  family: 4 // IPv4
})
  .then(() => {
    console.log('MongoDB connection successful');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    console.error('Error Details:', err.stack);
  });

// Listening to Mongoose Connection Events
const db = mongoose.connection;

db.on('connecting', () => {
  console.log('Mongoose: Attempting to connect...');
});

db.on('connected', () => {
  console.log('Mongoose: Connection successful');
});

db.on('disconnecting', () => {
  console.log('Mongoose: Attempting to disconnect...');
});

db.on('disconnected', () => {
  console.log('Mongoose: Disconnected');
});

db.on('reconnected', () => {
  console.log('Mongoose: Reconnected');
});

db.on('error', (error) => {
  console.error('Mongoose: Connection error:', error);
});

// Closing the connection when the application is terminated
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Mongoose connection closed');
  process.exit(0);
});
