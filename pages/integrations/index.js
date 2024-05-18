import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Integrations() {
  const [integrations, setIntegrations] = useState([]);

  useEffect(() => {
    const fetchIntegrations = async () => {
      const response = await axios.get('/api/integrations');
      setIntegrations(response.data.data);
    };
    fetchIntegrations();
  }, []);

  return (
    <div>
      <h1>Integrations</h1>
      <ul>
        {integrations.map(integration => (
          <li key={integration._id}>
            {integration.platform} - {integration.sellerId}
          </li>
        ))}
      </ul>
    </div>
  );
}
