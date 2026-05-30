import { useEffect, useState } from "react";

import "../styles/AdminUsers.css";

import {
  FaUser,
  FaTrash,
  FaEnvelope,
  FaPhone,
  FaSignOutAlt,
} from "react-icons/fa";

export default function AdminUsers() {

  const [users, setUsers] = useState([]);

  useEffect(() => {

    fetchUsers();

  }, []);

  const fetchUsers = async () => {

    try {

      const response = await fetch(
        "https://jewellkash.onrender.com/users"
      );

      const data = await response.json();

      setUsers(data);

    } catch (err) {

      console.error(err.message);

    }
  };

  // Delete User
  const handleDelete = async (id) => {

    try {

      await fetch(
        `https://jewellkash.onrender.com/users/${id}`,
        {
          method: "DELETE",
        }
      );

      setUsers(
        users.filter(
          (user) => user.id !== id
        )
      );

    } catch (err) {

      console.error(err.message);

    }
  };

  return (
    <div className="admin-users-page">

      {/* Navbar */}
      <nav className="dashboard-nav">

        <div className="dashboard-logo">
          JEWELLKASH ADMIN
        </div>

        <div className="dashboard-links">

          <a href="/admin-dashboard">
            Dashboard
          </a>

          <a href="/admin-products">
            Products
          </a>

          <a href="/admin-orders">
            Orders
          </a>

          <a href="/admin-users">
            Users
          </a>

          <a href="/" className="logout-btn">
            <FaSignOutAlt />
            Logout
          </a>

        </div>

      </nav>

      {/* Hero */}
      <section className="admin-users-hero">

        <h1>
          Manage Users ✨
        </h1>

        <p>
          View and manage registered customers.
        </p>

      </section>

      {/* Users */}
      <div className="users-grid">

        {users.map((user) => (

          <div
            className="user-card"
            key={user.id}
          >

            {/* Avatar */}
            <div className="user-avatar">

              <FaUser />

            </div>

            {/* Content */}
            <div className="user-content">

              <h2>
                {user.name}
              </h2>

              <div className="user-info">

                <p>
                  <FaEnvelope />
                  {user.email}
                </p>

                <p>
                  <FaPhone />
                  {user.phone}
                </p>

              </div>

              <span className="join-date">
                Joined: {user.joined_date}
              </span>

              {/* Actions */}
              <div className="user-actions">

                <button
                  className="delete-btn"
                  onClick={() =>
                    handleDelete(user.id)
                  }
                >

                  <FaTrash />

                  Delete User

                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}