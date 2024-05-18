import { useState } from 'react';
import axios from 'axios';

export default function NewWarehouse() {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    capacity: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/warehouses', formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Add New Warehouse</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
        <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
        <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} placeholder="Capacity" />
        <button type="submit">Add Warehouse</button>
      </form>
    </div>
  );
}
