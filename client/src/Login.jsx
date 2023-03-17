import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");

    const formSubmit = async (e) => {
        e.preventDefault();
        if (!email && !password) {
            setTimeout(() => {
                setMsg("");
            }, 3000);
            return setMsg("Complete all fields");
        }
        const data = {
            email: email,
            password: password,
        };
        try {
            const response = await axios.post("http://localhost:4000/login", data);
            const result = response.data;
            console.log(result);
            if (result.user.role === "admin") {
                navigate("/adminHome");
            } else if (result.user.role === "user") {
                navigate("/userHome");
            } else if (result.msg) {
                setMsg("Login Faild");
            } 

                
            
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <div>
            <h3>Login</h3>
            {msg && <p>{msg}</p>}
            <div>
                <form style={{ padding: "5px" }} onSubmit={(e) => formSubmit(e)}>
                    <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} placeholder="email" />
                    <br />
                    <input
                        type="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password"
                    />
                    <br />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}
