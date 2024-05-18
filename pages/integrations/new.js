import { useState } from 'react';
import axios from 'axios';

export default function NewIntegration() {
  const [formData, setFormData] = useState({
    platform: '',
    apiKey: '',
    apiSecret: '',
    sellerId: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/integrations', formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Add New Integration</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="platform" value={formData.platform} onChange={handleChange} placeholder="Platform" />
        <input type="text" name="apiKey" value={formData.apiKey} onChange={handleChange} placeholder="API Key" />
        <input type="text" name="apiSecret" value={formData.apiSecret} onChange={handleChange} placeholder="API Secret" />
        <input type="text" name="sellerId" value={formData.sellerId} onChange={handleChange} placeholder="Seller ID" />
        <button type="submit">Add Integration</button>
      </form>
    </div>
  );
}
