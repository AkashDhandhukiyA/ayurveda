import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./admindashboard.css";

const Admindashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openProductMenu, setOpenProductMenu] = useState(false);
  const [openBlogMenu, setOpenBlogMenu] = useState(false);

  const location = useLocation();

  const menuItems = [
    { icon: "📊", label: "Dashboard", path: "/admin/dashboard" },

    // PRODUCTS DROPDOWN
    {
      type: "dropdown",
      icon: "📦",
      label: "Products",
      submenu: [
        { label: "View Products", path: "/admin/Viewadminproduct" },
        { label: "Add Product", path: "/admin/add-product" },
      ],
    },

    // BLOG DROPDOWN
    {
      type: "dropdown",
      icon: "📝",
      label: "Blog",
      submenu: [
        { label: "View Blogs", path: "/admin/blogs" },
        { label: "Add Blog", path: "/admin/add-blog" },
      ],
    },

    { icon: "👥", label: "Users", path: "/admin/users" },
    { icon: "💰", label: "Sales", path: "/admin/sales" },
    { icon: "⚙️", label: "Settings", path: "/admin/settings" },
  ];

  const stats = [
    { title: "Total Users", value: "12,847", change: "+12%", color: "#3b82f6" },
    { title: "Revenue", value: "$24,580", change: "+8.2%", color: "#10b981" },
    { title: "Orders", value: "1,248", change: "+4.3%", color: "#8b5cf6" },
    { title: "Growth", value: "43.2%", change: "+2.1%", color: "#f59e0b" },
  ];

  const orders = [
    { name: "John Doe", product: "Premium", amount: "$99", status: "Completed" },
    { name: "Jane Smith", product: "Basic", amount: "$29", status: "Pending" },
    { name: "Bob Johnson", product: "Pro", amount: "$199", status: "Processing" },
    { name: "Alice Brown", product: "Basic", amount: "$29", status: "Completed" },
  ];

  return (
    <div className="dashboard">

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <h2>AdminPanel</h2>
          <button className="close-btn" onClick={() => setSidebarOpen(false)}>
            ×
          </button>
        </div>

        <div className="menu">
          {menuItems.map((item, index) => {
            if (item.type === "dropdown") {
              return (
                <div key={index} className="dropdown-section">
                  <div
                    className="menu-item"
                    onClick={() => {
                      if (item.label === "Products") {
                        setOpenProductMenu(!openProductMenu);
                      } else {
                        setOpenBlogMenu(!openBlogMenu);
                      }
                    }}
                  >
                    <span className="menu-icon">{item.icon}</span>
                    <span className="menu-label">{item.label}</span>
                    <span className="arrow">▾</span>
                  </div>

                  {/* DROPDOWN SUBMENU */}
                  <div
                    className={`submenu ${
                      (item.label === "Products" && openProductMenu) ||
                      (item.label === "Blog" && openBlogMenu)
                        ? "open"
                        : ""
                    }`}
                  >
                    {item.submenu.map((sub, i) => (
                      <Link
                        to={sub.path}
                        key={i}
                        className={`submenu-item ${
                          location.pathname === sub.path ? "active" : ""
                        }`}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            // Normal menu item
            return (
              <Link
                to={item.path}
                key={index}
                className={`menu-item ${
                  location.pathname === item.path ? "active" : ""
                }`}
              >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className={`main-content ${sidebarOpen ? "shifted" : ""}`}>
        <div className="topbar">
          <button
            className="menu-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <div className="user-info">
            <span className="username">Admin User</span>
            <div className="user-avatar">👤</div>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-card fade-in"
              style={{ "--delay": index }}
            >
              <div className="stat-header">
                <h3>{stat.title}</h3>
                <div className="stat-change" style={{ color: stat.color }}>
                  {stat.change}
                </div>
              </div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-bar" style={{ background: stat.color }} />
            </div>
          ))}
        </div>

        {/* Orders */}
        <div className="table-container slide-up">
          <h2>Recent Orders</h2>
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Product</th>
                <th>Blog</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{order.name}</td>
                  <td>{order.product}</td>
                  <td>{order.amount}</td>
                  <td>
                    <span
                      className={`status status-${order.status.toLowerCase()}`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Chart */}
        <div className="chart-container slide-up">
          <h2>Revenue Chart</h2>
          <div className="chart">
            {[40, 60, 80, 65, 90, 70, 85].map((height, i) => (
              <div key={i} className="chart-bar">
                <div className="bar-fill" style={{ height: `${height}%` }} />
                <span className="bar-label">
                  {["M", "T", "W", "T", "F", "S", "S"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admindashboard;
