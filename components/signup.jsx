// import { useState } from 'react';
// import axios from 'axios';

// export default function Signup() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (isLogin) {
//       // LOGIN
//       try {
//         const res = await axios.post('http://localhost:8000/api/login/', {
//           username,
//           password,
//         });

//         localStorage.setItem('access_token', res.data.access);
//         localStorage.setItem('refresh_token', res.data.refresh);

//         setMessage('Login successful! 🎉');
//       } catch (err) {
//         console.error(err);
//         setMessage('Login failed ❌');
//       }
//     } else {
//       // SIGNUP
//       try {
//         await axios.post('http://localhost:8000/api/register/', {
//           username,
//           password,
//         });

//         setMessage('Signup successful! Now login 🚀');
//         setIsLogin(true);
//       } catch (err) {
//         console.error(err);
//         setMessage('Signup failed ❌');
//       }
//     }
//   };

//   return (
//     <div style={{ maxWidth: '400px', margin: 'auto', marginTop: '50px' }}>
//       <h2>{isLogin ? 'Login' : 'Signup'}</h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//           style={{ display: 'block', width: '100%', marginBottom: '10px' }}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           style={{ display: 'block', width: '100%', marginBottom: '10px' }}
//         />

//         <button type="submit" style={{ width: '100%', padding: '10px' }}>
//           {isLogin ? 'Login' : 'Signup'}
//         </button>
//       </form>

//       <button
//         onClick={() => setIsLogin(!isLogin)}
//         style={{ marginTop: '10px', width: '100%' }}
//       >
//         {isLogin ? 'Create new account' : 'Already have an account? Login'}
//       </button>

//       {message && <p style={{ marginTop: '20px' }}>{message}</p>}
//     </div>
//   );
// }


import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [state, setState] = useState({ name: "", email: "", username: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
    console.log(state);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register/', state); 
      console.log('Success:', response.data);
      alert('Signup Successful ✅');
    } catch (error) {
        if (error.response) {
          console.error('Error:', error.response.data);
          alert('Signup Failed ❌');
        } else {
          console.error('Unexpected Error:', error.message);
          alert('Something went wrong ❌');
        }
      }
      
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', marginTop: '50px' }}>
      <h2>Signup Form ✍️</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Name"
          onChange={handleChange}
          value={state.name}
        />
        <br /><br />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          value={state.email}
        />
        <br /><br />
        <input
          name="username"
          type="text"
          placeholder="Username"
          onChange={handleChange}
          value={state.username}
        />
        <br /><br />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={state.password}
        />
        <br /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Signup;
