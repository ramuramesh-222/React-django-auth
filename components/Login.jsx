import React, { useState } from 'react'

function Login() {
    const [user,setUser] = useState({username:'',password:''});
    const valueset = (e)=>{
        let {name , value} = e.target;
        setUser({...user,[name]:value})
    }
    // const handleSubmitting =(e)=>{
    //     e.preventDefault()
    //     fetch('http://127.0.0.1:8000/api/login/',{
    //         method:'Post',
    //         headers:{"Content-Type":"application/json"},
    //         body : JSON.stringify(user)
    //     }).then(res=>res.json())
    //     .then(json=>console.log(json))
    // }

    const handleSubmitting = (e) => {
        e.preventDefault();
        fetch('http://127.0.0.1:8000/api/login/', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(json => {
            console.log(json);
            if (json.access) {
                localStorage.setItem('access_token', json.access);
                localStorage.setItem('refresh_token', json.refresh);
                alert("Login Successful ✅");
            } else {
                alert("Login Failed ❌");
            }
        })
        .catch(err => {
            console.error('Error:', err);
            alert('Something went wrong ❌');
        });
    }
    
  return (
    <div>
        <form onSubmit={handleSubmitting}>
      <input name='username' type='text' placeholder='username' onChange={valueset}/><br/>
      <input name='password' type='password' placeholder='username' onChange={valueset} /><br/>
      <button type='submit'>Submit</button>
      </form>

    </div>
  )
}

export default Login
