import { useState } from 'react';
import axios from 'axios';
import { Container, Input, Button, Text } from '@nextui-org/react';

export default function NewProduct() {
  const [formData, setFormData] = useState({
    name: '',
    stockcode: '',
    barcode: '',
    deporaf: '',
    depoalan: '',
    category: '',
    brand: '',
    buyprice: '',
    marketprice: '',
    saleprice: '',
    quantity: '',
    fakequantity: '',
    criticalquantity: '',
    images: [],
    descriptions: '',
    desi: '',
    supplier: '',
    tags: [],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/products', formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Text h1 className="mb-4">Add New Product</Text>
      <form onSubmit={handleSubmit}>
        <Input fullWidth label="Product Name" name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" className="mb-4" />
        <Input fullWidth label="Stock Code" name="stockcode" value={formData.stockcode} onChange={handleChange} placeholder="Stock Code" className="mb-4" />
        <Input fullWidth label="Barcode" name="barcode" value={formData.barcode} onChange={handleChange} placeholder="Barcode" className="mb-4" />
        <Input fullWidth label="Depo Raf Kodu" name="deporaf" value={formData.deporaf} onChange={handleChange} placeholder="Depo Raf Kodu" className="mb-4" />
        <Input fullWidth label="Depo Alan Kodu" name="depoalan" value={formData.depoalan} onChange={handleChange} placeholder="Depo Alan Kodu" className="mb-4" />
        <Input fullWidth label="Category" name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="mb-4" />
        <Input fullWidth label="Brand" name="brand" value={formData.brand} onChange={handleChange} placeholder="Brand" className="mb-4" />
        <Input fullWidth label="Buy Price" name="buyprice" type="number" value={formData.buyprice} onChange={handleChange} placeholder="Buy Price" className="mb-4" />
        <Input fullWidth label="Market Price" name="marketprice" type="number" value={formData.marketprice} onChange={handleChange} placeholder="Market Price" className="mb-4" />
        <Input fullWidth label="Sale Price" name="saleprice" type="number" value={formData.saleprice} onChange={handleChange} placeholder="Sale Price" className="mb-4" />
        <Input fullWidth label="Quantity" name="quantity" type="number" value={formData.quantity} onChange={handleChange} placeholder="Quantity" className="mb-4" />
        <Input fullWidth label="Fake Quantity" name="fakequantity" type="number" value={formData.fakequantity} onChange={handleChange} placeholder="Fake Quantity" className="mb-4" />
        <Input fullWidth label="Critical Quantity" name="criticalquantity" type="number" value={formData.criticalquantity} onChange={handleChange} placeholder="Critical Quantity" className="mb-4" />
        <Input fullWidth label="Descriptions" name="descriptions" value={formData.descriptions} onChange={handleChange} placeholder="Descriptions" className="mb-4" />
        <Input fullWidth label="Desi" name="desi" type="number" value={formData.desi} onChange={handleChange} placeholder="Desi" className="mb-4" />
        <Input fullWidth label="Supplier" name="supplier" value={formData.supplier} onChange={handleChange} placeholder="Supplier" className="mb-4" />
        <Input fullWidth label="Tags" name="tags" value={formData.tags} onChange={handleChange} placeholder="Tags" className="mb-4" />
        <Button type="submit">Add Product</Button>
      </form>
    </Container>
  );
}
