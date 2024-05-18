import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Container, Text, Input, Grid } from '@nextui-org/react';
import { useRouter } from 'next/router';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('/api/products');
      setProducts(response.data.data);
      setFilteredProducts(response.data.data);
    };
    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);
      setFilteredProducts(filteredProducts.filter(product => product._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Text h1 className="mb-4">Products</Text>
      <Grid.Container gap={2} justify="center">
        <Grid xs={12} sm={6}>
          <Input
            clearable
            underlined
            labelPlaceholder="Search Products"
            value={searchTerm}
            onChange={handleSearch}
            fullWidth
          />
        </Grid>
      </Grid.Container>
      <Table aria-label="Example table with static content" css={{ height: "auto", minWidth: "100%" }}>
        <Table.Header>
          <Table.Column>NAME</Table.Column>
          <Table.Column>STOCK CODE</Table.Column>
          <Table.Column>ACTIONS</Table.Column>
        </Table.Header>
        <Table.Body>
          {filteredProducts.map(product => (
            <Table.Row key={product._id}>
              <Table.Cell>{product.name}</Table.Cell>
              <Table.Cell>{product.stockcode}</Table.Cell>
              <Table.Cell>
                <Button size="sm" onClick={() => router.push(`/products/${product._id}`)}>Edit</Button>
                <Button size="sm" color="error" onClick={() => handleDelete(product._id)}>Delete</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  );
}
