import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export default function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const formSubmit = async (e) => {
        e.preventDefault();
        if (!name && !password && !email && !role) {
            setTimeout(() => {
                setErrMsg("");
            }, 4000);
            return setErrMsg("Fill All Fields");
        }
        const data = {
            name: name,
            email: email,
            password: password,
            role: role,
        };
        try {
            const response = await axios.post("http://localhost:4000/register", data);
            console.log(response.data);
            if (response.data) {
                navigate("/login");
            } else {
                setErrMsg("Registration failed");
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <div>
            <h3>Register</h3>
            {errMsg && <p style={{ color: "red" }}>{errMsg}</p>}
            <div>
                <form style={{ padding: "5px" }} onSubmit={(e) => formSubmit(e)}>
                    <input type="text" name="name" onChange={(e) => setName(e.target.value)} placeholder="name" />
                    <br />
                    <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} placeholder="email" />
                    <br />
                    <input
                        type="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password"
                    />
                    <br />
                    <input type="text" name="role" onChange={(e) => setRole(e.target.value)} placeholder="Role" />
                    <br></br>
                    <button type="submit">Register</button>
                </form>
            </div>
            <button onClick={()=>{navigate("/login")}}>Login</button>
        </div>
    );
}
