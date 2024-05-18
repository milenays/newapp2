import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      const response = await axios.get('/api/suppliers');
      setSuppliers(response.data.data);
    };
    fetchSuppliers();
  }, []);

  return (
    <div>
      <h1>Suppliers</h1>
      <ul>
        {suppliers.map(supplier => (
          <li key={supplier._id}>
            {supplier.name} - {supplier.contactName}
          </li>
        ))}
      </ul>
    </div>
  );
}
