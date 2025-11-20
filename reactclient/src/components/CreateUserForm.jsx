import React, { useState } from "react";
import { createUser } from "../api";

export default function CreateUserForm({ onUserCreated }) {
    const [form, setForm] = useState({
        name: "",
        age: "",
        email: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const submitForm = async (e) => {
        e.preventDefault();

        const payload = {
            name: form.name,
            age: Number(form.age),
            email: form.email
        };

        try {
            const res = await createUser(payload);
            onUserCreated(res.data); 
            alert("User Created!");
            setForm({ name: "", age: "", email: "" }); 
        } catch (err) {
            console.error(err);
            alert("Failed to create user.");
        }
    };

    return (
        <form onSubmit={submitForm} style={{ marginBottom: 30 }}>
            <h2>Create User</h2>

            <input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
            />
            <br /><br />

            <input
                name="age"
                type="number"
                placeholder="Age"
                value={form.age}
                onChange={handleChange}
            />
            <br /><br />

            <input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
            />
            <br /><br />

            <button type="submit">Create User</button>
        </form>
    );
}
