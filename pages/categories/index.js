import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Text, Input, Grid } from '@nextui-org/react';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get('/api/categories');
      setCategories(response.data.data);
      setFilteredCategories(response.data.data);
    };
    fetchCategories();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = categories.filter(category =>
      category.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  return (
    <Container>
      <Text h1 className="mb-4">Categories</Text>
      <Grid.Container gap={2} justify="center">
        <Grid xs={12} sm={6}>
          <Input
            clearable
            underlined
            labelPlaceholder="Search Categories"
            value={searchTerm}
            onChange={handleSearch}
            fullWidth
          />
        </Grid>
      </Grid.Container>
      <Table aria-label="Categories Table">
        <Table.Header>
          <Table.Column>Name</Table.Column>
          <Table.Column>Trendyol ID</Table.Column>
        </Table.Header>
        <Table.Body>
          {filteredCategories.map(category => (
            <Table.Row key={category._id}>
              <Table.Cell>{category.name}</Table.Cell>
              <Table.Cell>{category.tyid}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  );
}
