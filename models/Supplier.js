import mongoose from 'mongoose';

const SupplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
}, {
  timestamps: true,
});

export default mongoose.models.Supplier || mongoose.model('Supplier', SupplierSchema);
