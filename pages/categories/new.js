import { useState } from 'react';
import axios from 'axios';

export default function NewCategory() {
  const [formData, setFormData] = useState({
    name: '',
    tyid: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/categories', formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Add New Category</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Category Name" />
        <input type="text" name="tyid" value={formData.tyid} onChange={handleChange} placeholder="Trendyol ID" />
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
}
