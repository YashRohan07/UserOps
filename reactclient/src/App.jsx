import React, { useEffect, useState } from "react";
import { fetchUsers } from "./api";
import UserTable from "./components/UserTable";
import CreateUserForm from "./components/CreateUserForm";

export default function App() {
    const [users, setUsers] = useState([]);

    const loadUsers = async () => {
        const res = await fetchUsers();
        setUsers(res.data);
    };

    useEffect(() => {
        loadUsers();
    }, []);

    // When a user is created, update table
    const handleUserCreated = (newUser) => {
        setUsers((prev) => [...prev, newUser]);
    };

    return (
        <div style={{ padding: 40 }}>
            <h1>User Management System</h1>

            <CreateUserForm onUserCreated={handleUserCreated} />
            <UserTable users={users} />
        </div>
    );
}
