import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Text, Button } from '@nextui-org/react';
import { useRouter } from 'next/router';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get('/api/orders');
      setOrders(response.data.data);
    };
    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/orders/${id}`);
      setOrders(orders.filter(order => order._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Text h1 className="mb-4">Orders</Text>
      <Table aria-label="Example table with static content" css={{ height: "auto", minWidth: "100%" }}>
        <Table.Header>
          <Table.Column>ORDER NUMBER</Table.Column>
          <Table.Column>FULL NAME</Table.Column>
          <Table.Column>ACTIONS</Table.Column>
        </Table.Header>
        <Table.Body>
          {orders.map(order => (
            <Table.Row key={order._id}>
              <Table.Cell>{order.orderNumber}</Table.Cell>
              <Table.Cell>{order.fullName}</Table.Cell>
              <Table.Cell>
                <Button size="sm" onClick={() => router.push(`/orders/${order._id}`)}>View</Button>
                <Button size="sm" color="error" onClick={() => handleDelete(order._id)}>Delete</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  );
}
