import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";



function LoginForm({setUser}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify({ email, password }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user))
        history.replace('/')

      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }
  return (
    <div>
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input type="text"
        id="email"
        autoComplete="off"
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
       />

       <label htmlFor="password">Password</label>
       <input type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>

        <div>
          {errors.map((err) => {
            <ul key={err}>{errors}</ul>
          })}
        </div>
    </form>
  
     
    </div>
  )
}



export default LoginForm
