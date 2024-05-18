import Head from 'next/head';
import { Button, Card, Text } from '@nextui-org/react';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Stockie</title>
        <meta name="description" content="Stock Management System" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-center">
        <Text h1 className="mb-4">Welcome to Stockie</Text>
        <Card className="mb-4">
          <Card.Body>
            <Text>Get started by exploring our product management system.</Text>
          </Card.Body>
        </Card>
        <Button auto color="primary">Get Started</Button>
      </main>
    </div>
  );
}
