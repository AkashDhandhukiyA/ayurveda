import { FaBookReader } from "react-icons/fa";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Blog.css";

const Blog = () => {
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
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

    fetchBlogs();
  }, []);

  const handleBlogClick = (id) => {
    navigate(`/blog/${id}`);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Blogs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <h3>{error}</h3>
        <button className="retry-btn" onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="blog-main-container">
      <div className="page-header">
        <h1 className="page-title">LATEST BLOGS</h1>
        <p className="page-subtitle">
          Discover amazing stories and insights from our community
        </p>
      </div>

      <div className="blog-list-wrapper">
        {/* LEFT BLOG LIST */}
        <div className="blog-left-section">
          {blogData.map((item, index) => (
            <article
              key={item._id}
              className="blog-item"
              onClick={() => handleBlogClick(item._id)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="blog-image-wrapper">
                <img
                  src={`https://ayurvedab.vercel.app/uploads/${item.image}`}
                  alt={item.name}
                  className="blog-round-img"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                <div className="image-fallback">📝</div>
              </div>

              <div className="blog-text-content">
                <h2 className="blog-title">{item.name}</h2>
                <p className="blog-meta">
                  By Admin •{" "}
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>

                <p className="blog-desc">
                  {item.blogcontain?.substring(0, 180)}...
                </p>

                <button className="read-more-btn">
                  READ MORE  <FaBookReader />
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12H19M12 5L19 12L12 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <div className="blog-divider"></div>
              </div>
            </article>
          ))}
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="blog-right-section">
          <div className="sidebar-card">
            <h2 className="sidebar-title">Recent Posts</h2>
            <div className="sidebar-posts">
              {blogData.slice(0, 3).map((item, index) => (
                <div
                  key={item._id}
                  className="sidebar-post"
                  onClick={() => handleBlogClick(item._id)}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="sidebar-image-wrapper">
                    <img
                      src={`https://ayurvedab.vercel.app/uploads/${item.image}`}
                      alt={item.name}
                      className="sidebar-img"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                    <div className="sidebar-image-fallback">📖</div>
                  </div>
                  <div className="sidebar-content">
                    <h3 className="sidebar-post-title">{item.name}</h3>
                    <p className="blog-meta">By Admin</p>
                    <p className="sidebar-text">
                      {item.blogcontain?.substring(0, 80)}...
                    </p>
                    <button className="sidebar-read-btn">
                      READ MORE
                     
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="sidebar-card">
            <h2 className="sidebar-title">Newsletter</h2>
            <div className="newsletter-box">
              <p>Subscribe to get latest updates</p>
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletter-input"
              />
              <button className="subscribe-btn">SUBSCRIBE</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Blog;
