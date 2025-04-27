import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Alluser() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('access_token');

      try {
        const res = await axios.get('http://localhost:8000/api/users/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', marginTop: '50px' }}>
      <h2>All Users 👥</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> ({user.username})
          </li>
        ))}
      </ul>
    </div>
  );
}
