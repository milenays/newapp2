import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true },
  fullName: { type: String, required: true },
  address1: { type: String, required: true },
  city: { type: String, required: true },
  district: { type: String, required: true },
  countryCode: { type: String, required: true },
  neighborhood: { type: String, required: true },
  neighborhoodId: { type: String, required: true },
  lines: { type: Array, required: true },
  status: { type: String, required: true },
  shipmentPackageStatus: { type: String, required: true },
  cargoSenderNumber: { type: String, required: true },
  cargoProviderName: { type: String, required: true },
  integrations: { type: Object, required: true },
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
