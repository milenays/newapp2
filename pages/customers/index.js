import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Text, Button, Input, Grid } from '@nextui-org/react';
import { useRouter } from 'next/router';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await axios.get('/api/customers');
      setCustomers(response.data.data);
      setFilteredCustomers(response.data.data);
    };
    fetchCustomers();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = customers.filter(customer =>
      customer.fullName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredCustomers(filtered);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/customers/${id}`);
      setFilteredCustomers(filteredCustomers.filter(customer => customer._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Text h1 className="mb-4">Customers</Text>
      <Grid.Container gap={2} justify="center">
        <Grid xs={12} sm={6}>
          <Input
            clearable
            underlined
            labelPlaceholder="Search Customers"
            value={searchTerm}
            onChange={handleSearch}
            fullWidth
          />
        </Grid>
      </Grid.Container>
      <Table aria-label="Customers Table">
        <Table.Header>
          <Table.Column>FULL NAME</Table.Column>
          <Table.Column>EMAIL</Table.Column>
          <Table.Column>PHONE</Table.Column>
          <Table.Column>ACTIONS</Table.Column>
        </Table.Header>
        <Table.Body>
          {filteredCustomers.map(customer => (
            <Table.Row key={customer._id}>
              <Table.Cell>{customer.fullName}</Table.Cell>
              <Table.Cell>{customer.email}</Table.Cell>
              <Table.Cell>{customer.phone}</Table.Cell>
              <Table.Cell>
                <Button size="sm" onClick={() => router.push(`/customers/${customer._id}`)}>Edit</Button>
                <Button size="sm" color="error" onClick={() => handleDelete(customer._id)}>Delete</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  );
}
