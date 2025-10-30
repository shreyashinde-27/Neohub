import React, { useEffect, useState } from "react";
import UserTable from "../components/UserTable";
import { Navigate } from "react-router-dom";

interface User {
  id: number;
  name: string;
  email: string;
}

const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // Check login using localStorage (consistent with other pages)
  const token = localStorage.getItem("authToken");
  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();
        setUsers(data);
      } catch (error: any) {
        setErr(error.message || "Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  if (loading) {
    return <div className="p-6">Loading users...</div>;
  }

  if (err) {
    return <div className="p-6 text-red-500">{err}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <UserTable users={users} />
    </div>
  );
};

export default Home;
