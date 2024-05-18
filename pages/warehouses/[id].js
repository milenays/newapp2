import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Container, Input, Button, Text } from '@nextui-org/react';

export default function EditWarehouse() {
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    capacity: '',
  });

  useEffect(() => {
    if (id) {
      const fetchWarehouse = async () => {
        const response = await axios.get(`/api/warehouses/${id}`);
        setFormData(response.data.data);
      };
      fetchWarehouse();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/warehouses/${id}`, formData);
      console.log(response.data);
      router.push('/warehouses');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Text h1 className="mb-4">Edit Warehouse</Text>
      <form onSubmit={handleSubmit}>
        <Input fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="mb-4" />
        <Input fullWidth label="Location" name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="mb-4" />
        <Input fullWidth label="Capacity" name="capacity" type="number" value={formData.capacity} onChange={handleChange} placeholder="Capacity" className="mb-4" />
        <Button type="submit">Save Changes</Button>
      </form>
    </Container>
  );
}
