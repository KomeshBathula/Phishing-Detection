import mongoose from 'mongoose';

const ScanSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['url', 'email', 'text']
  },
  input: {
    type: String,
    required: true
  },
  riskScore: {
    type: Number,
    required: true
  },
  classification: {
    type: String,
    required: true
  },
  reasons: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Scan = mongoose.model('Scan', ScanSchema);

export default Scan;
