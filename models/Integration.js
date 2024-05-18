import mongoose from 'mongoose';

const IntegrationSchema = new mongoose.Schema({
  platform: { type: String, required: true },
  apiKey: { type: String, required: true },
  apiSecret: { type: String, required: true },
  sellerId: { type: String, required: true },
}, {
  timestamps: true,
});

export default mongoose.models.Integration || mongoose.model('Integration', IntegrationSchema);
