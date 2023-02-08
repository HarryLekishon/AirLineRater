import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { FormField, Error } from '../../styles'
function Signup({ setUser }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const [errors, setErrors] = useState([]);


    function handleSubmit(e) {
        e.preventDefault();
        fetch("/api/v1/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({

                email,
                password,
            }),
        }).then((r) => {
            if (r.ok) {
                history.replace('/')
                r.json().then((user) => setUser(user));
            } else {
                r.json().then((err) => setErrors(err.errors));
                console.log(errors);
            }
        });
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>SignUp</h1>
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    id="email"
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password"></label>
                <input type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type='submit'>Sign Up</button>

                <FormField>
                    {errors && errors.length > 0 && errors.map((error) => (
                        <Error key={error}>{error}</Error>
                    ))}
                </FormField>
            </form>
        </div>
    )
}

export default Signup
