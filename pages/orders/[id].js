import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Container, Text, Table, Button } from '@nextui-org/react';

export default function OrderDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchOrder = async () => {
        const response = await axios.get(`/api/orders/${id}`);
        setOrder(response.data.data);
      };
      fetchOrder();
    }
  }, [id]);

  if (!order) return <div>Loading...</div>;

  const handleStatusChange = async (newStatus) => {
    try {
      const response = await axios.put(`/api/orders/${id}`, { status: newStatus });
      setOrder(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Text h1 className="mb-4">Order Details</Text>
      <Table aria-label="Order Details" css={{ height: "auto", minWidth: "100%" }}>
        <Table.Header>
          <Table.Column>FIELD</Table.Column>
          <Table.Column>VALUE</Table.Column>
        </Table.Header>
        <Table.Body>
          {Object.entries(order).map(([key, value]) => (
            <Table.Row key={key}>
              <Table.Cell>{key}</Table.Cell>
              <Table.Cell>{Array.isArray(value) ? JSON.stringify(value) : value}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Button.Group>
        <Button onClick={() => handleStatusChange('Pending')}>Pending</Button>
        <Button onClick={() => handleStatusChange('Shipped')}>Shipped</Button>
        <Button onClick={() => handleStatusChange('Delivered')}>Delivered</Button>
      </Button.Group>
    </Container>
  );
}
