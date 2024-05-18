import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 },
  stockcode: { type: String, required: true },
  barcode: { type: String },
  deporaf: { type: String },
  depoalan: { type: String },
  category: { type: String },
  brand: { type: String },
  buyprice: { type: Number, required: true },
  marketprice: { type: Number, required: true },
  saleprice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  fakequantity: { type: Number, required: true },
  criticalquantity: { type: Number, required: true },
  images: [{ type: String }],
  descriptions: { type: String },
  desi: { type: Number },
  supplier: { type: String },
  tags: [{ type: String }],
}, {
  timestamps: true,
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
