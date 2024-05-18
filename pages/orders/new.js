import { useState } from 'react';
import axios from 'axios';

export default function NewOrder() {
  const [formData, setFormData] = useState({
    orderNumber: '',
    fullName: '',
    address1: '',
    city: '',
    district: '',
    countryCode: '',
    neighborhood: '',
    neighborhoodId: '',
    lines: [],
    status: '',
    shipmentPackageStatus: '',
    cargoSenderNumber: '',
    cargoProviderName: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddLine = () => {
    setFormData({
      ...formData,
      lines: [...formData.lines, { productId: '', quantity: '', price: '' }],
    });
  };

  const handleLineChange = (index, e) => {
    const newLines = formData.lines.map((line, i) => 
      i === index ? { ...line, [e.target.name]: e.target.value } : line
    );
    setFormData({ ...formData, lines: newLines });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/orders', formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Add New Order</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="orderNumber" value={formData.orderNumber} onChange={handleChange} placeholder="Order Number" />
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" />
        <input type="text" name="address1" value={formData.address1} onChange={handleChange} placeholder="Address" />
        <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" />
        <input type="text" name="district" value={formData.district} onChange={handleChange} placeholder="District" />
        <input type="text" name="countryCode" value={formData.countryCode} onChange={handleChange} placeholder="Country Code" />
        <input type="text" name="neighborhood" value={formData.neighborhood} onChange={handleChange} placeholder="Neighborhood" />
        <input type="text" name="neighborhoodId" value={formData.neighborhoodId} onChange={handleChange} placeholder="Neighborhood ID" />
        {formData.lines.map((line, index) => (
          <div key={index}>
            <input type="text" name="productId" value={line.productId} onChange={(e) => handleLineChange(index, e)} placeholder="Product ID" />
            <input type="number" name="quantity" value={line.quantity} onChange={(e) => handleLineChange(index, e)} placeholder="Quantity" />
            <input type="number" name="price" value={line.price} onChange={(e) => handleLineChange(index, e)} placeholder="Price" />
          </div>
        ))}
        <button type="button" onClick={handleAddLine}>Add Line</button>
        <input type="text" name="status" value={formData.status} onChange={handleChange} placeholder="Status" />
        <input type="text" name="shipmentPackageStatus" value={formData.shipmentPackageStatus} onChange={handleChange} placeholder="Shipment Package Status" />
        <input type="text" name="cargoSenderNumber" value={formData.cargoSenderNumber} onChange={handleChange} placeholder="Cargo Sender Number" />
        <input type="text" name="cargoProviderName" value={formData.cargoProviderName} onChange={handleChange} placeholder="Cargo Provider Name" />
        <button type="submit">Add Order</button>
      </form>
    </div>
  );
}
