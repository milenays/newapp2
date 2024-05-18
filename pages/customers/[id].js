import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Container, Input, Button, Text } from '@nextui-org/react';

export default function EditCustomer() {
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    countryCode: '',
    zipCode: '',
  });

  useEffect(() => {
    if (id) {
      const fetchCustomer = async () => {
        const response = await axios.get(`/api/customers/${id}`);
        setFormData(response.data.data);
      };
      fetchCustomer();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/customers/${id}`, formData);
      console.log(response.data);
      router.push('/customers');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Text h1 className="mb-4">Edit Customer</Text>
      <form onSubmit={handleSubmit}>
        <Input fullWidth label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" className="mb-4" />
        <Input fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" className="mb-4" />
        <Input fullWidth label="Phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="mb-4" />
        <Input fullWidth label="Address" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="mb-4" />
        <Input fullWidth label="City" name="city" value={formData.city} onChange={handleChange} placeholder="City" className="mb-4" />
        <Input fullWidth label="District" name="district" value={formData.district} onChange={handleChange} placeholder="District" className="mb-4" />
        <Input fullWidth label="Country Code" name="countryCode" value={formData.countryCode} onChange={handleChange} placeholder="Country Code" className="mb-4" />
        <Input fullWidth label="Zip Code" name="zipCode" value={formData.zipCode} onChange={handleChange} placeholder="Zip Code" className="mb-4" />
        <Button type="submit">Save Changes</Button>
      </form>
    </Container>
  );
}
