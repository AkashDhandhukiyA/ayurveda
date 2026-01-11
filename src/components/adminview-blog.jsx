import { FaBookReader, FaEdit, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Blogadmin.css";

const AdminviewBlog = () => {
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setmessage] = useState("");
  const [status, setstatus] = useState("");
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("https://ayurvedab.vercel.app/blog");
      if (!response.ok) throw new Error("Failed to fetch blogs");
      const data = await response.json();
      setBlogData(data.BlogData || []);
    } catch (err) {
      setError("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`https://ayurvedab.vercel.app/admin/blogdelete/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();

      if (data.success) {
        setmessage(data.message);
        setstatus("success");
      } else {
        setmessage("something wrong!");
        setstatus("error");
      }
    } catch (error) {
      setmessage("server error give ione minites! ");
      setstatus("error");
    }

  };

  // 🔹 Loading
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Blogs...</p>
      </div>
    );
  }

  // 🔹 Error
  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <h3>{error}</h3>
      </div>
    );
  }

  return (
    <div className="product-wrapper">

    {/* 🔔 Message Box */}
    {message && (
      <div className={`MASSAGE-BOX ${status}`}>
        {message}
      </div>
    )}
    <div className="blog-container">
      {blogData.length === 0 ? (
        <p>No blogs found</p>
      ) : (
        blogData.map((blog) => (
          <div className="blog-card" key={blog._id}>
            <img
              src={`https://ayurvedab.vercel.app/uploads/${blog.image}`}
              alt={blog.name}
            />

            <div className="blog-content">
              <h2>{blog.name}</h2>
              <p className="blog-text">{blog.blogcontain}</p>
              <p className="blog-desc">{blog.description}</p>
            </div>

            <FaBookReader className="read-icon" />

            {/* 🔹 Admin Buttons */}
            <div className="admin-actions">
              <button
                className="btn-update"
                onClick={() => navigate(`/admin/updateblog/${blog._id}`)}
              >
                <FaEdit /> Update
              </button>

              <button
                className="btn-delete"
                onClick={() => handleDelete(blog._id)}
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
    </div>
  );
};

export default AdminviewBlog;
