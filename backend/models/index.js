import mongoose from 'mongoose';
import Scan from './Scan.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/phishing-detection';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

export { Scan };
