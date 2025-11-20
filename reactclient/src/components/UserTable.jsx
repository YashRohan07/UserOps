import React from "react";

export default function UserTable({ users }) {
    return (
        <table border="1" cellPadding="10" style={{ marginTop: 30, width: "100%" }}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Email</th>
                    <th>Timestamp</th>
                </tr>
            </thead>

            <tbody>
                {users.length === 0 ? (
                    <tr>
                        <td colSpan="5" align="center">No users found</td>
                    </tr>
                ) : (
                    users.map((u) => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.name}</td>
                            <td>{u.age}</td>
                            <td>{u.email}</td>
                            <td>{u.timeStamp}</td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
}
