import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Text, Button, Input, Grid } from '@nextui-org/react';
import { useRouter } from 'next/router';

export default function Warehouses() {
  const [warehouses, setWarehouses] = useState([]);
  const [filteredWarehouses, setFilteredWarehouses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchWarehouses = async () => {
      const response = await axios.get('/api/warehouses');
      setWarehouses(response.data.data);
      setFilteredWarehouses(response.data.data);
    };
    fetchWarehouses();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = warehouses.filter(warehouse =>
      warehouse.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredWarehouses(filtered);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/warehouses/${id}`);
      setFilteredWarehouses(filteredWarehouses.filter(warehouse => warehouse._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Text h1 className="mb-4">Warehouses</Text>
      <Grid.Container gap={2} justify="center">
        <Grid xs={12} sm={6}>
          <Input
            clearable
            underlined
            labelPlaceholder="Search Warehouses"
            value={searchTerm}
            onChange={handleSearch}
            fullWidth
          />
        </Grid>
      </Grid.Container>
      <Table aria-label="Warehouses Table">
        <Table.Header>
          <Table.Column>NAME</Table.Column>
          <Table.Column>LOCATION</Table.Column>
          <Table.Column>CAPACITY</Table.Column>
          <Table.Column>ACTIONS</Table.Column>
        </Table.Header>
        <Table.Body>
          {filteredWarehouses.map(warehouse => (
            <Table.Row key={warehouse._id}>
              <Table.Cell>{warehouse.name}</Table.Cell>
              <Table.Cell>{warehouse.location}</Table.Cell>
              <Table.Cell>{warehouse.capacity}</Table.Cell>
              <Table.Cell>
                <Button size="sm" onClick={() => router.push(`/warehouses/${warehouse._id}`)}>Edit</Button>
                <Button size="sm" color="error" onClick={() => handleDelete(warehouse._id)}>Delete</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  );
}
