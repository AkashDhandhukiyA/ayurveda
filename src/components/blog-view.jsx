import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./BlogViews.css";

const BlogViews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`https://ayurvedab.vercel.app/blog/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch blog data');
        }
        
        const data = await response.json();
        setBlogData(data.blog);
      } catch (err) {
        console.error(err);
        setError('Failed to load blog. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [id]);

  const handleProductPageClick = () => {
    // Navigate to product page - adjust the path as needed
    navigate("/product");
    // Alternatively, you can use:
    // window.location.href = "/products";
    // Or if you want to open in new tab:
    // window.open("/products", "_blank");
  };

  if (loading) {
    return (
      <div className="blog-loading">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <h3>Loading blog content...</h3>
          <p>Please wait while we fetch your blog</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-error">
        <div className="error-container">
          <div className="error-icon">📄</div>
          <h3>{error}</h3>
          <p>We couldn't load the blog post at this time.</p>
          <button 
            className="retry-button"
            onClick={() => window.location.reload()}
          >
            ↻ Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!blogData) {
    return (
      <div className="blog-not-found">
        <div className="not-found-container">
          <div className="not-found-icon">🔍</div>
          <h3>Blog Not Found</h3>
          <p>The blog post you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-wrapper">
      <article className="blog-container">
        {/* Image at the very top */}
        <div className="blog-image-section">
          {blogData.image ? (
            <div className="blog-image-container">
              <img
                src={`https://ayurvedab.vercel.app/uploads/${blogData.image}`}
                alt={blogData.name || "Blog image"}
                className="blog-main-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="blog-image-fallback">
                <div className="fallback-content">
                  <span>📷</span>
                  <p>Image Not Available</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="no-image-placeholder">
              <div className="placeholder-content">
                <span>✨</span>
                <p>No Image Available</p>
              </div>
            </div>
          )}
        </div>

        {/* Content section below image */}
        <div className="blog-content-section">
          <header className="blog-header">
            <div className="blog-meta">
              <div className="meta-badge">Featured Post</div>
              <h1 className="blog-title">{blogData.name}</h1>
            </div>
          </header>

          {/* Full width description section */}
          {blogData.description && (
            <section className="blog-description-section">
              <div className="description-container">
                <p className="blog-description">{blogData.description}</p>
              </div>
            </section>
          )}

          {/* Meta info below description */}
          <div className="blog-meta-info">
            <div className="read-time">
              ⏱️ {Math.ceil(blogData.blogcontain?.length / 200) || 5} min read
            </div>
          </div>

          <main className="blog-main">
            <div className="blog-content-wrapper">
              <div className="blog-content">
                <div className="content-container">
                  {blogData.blogcontain && (
                    <div className="blog-body">
                      {blogData.blogcontain.split('\n').map((paragraph, index) => (
                        <p key={index} className="blog-paragraph">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>

          <footer className="blog-footer">
            <div className="footer-content">
              <p>Thanks for reading! 📖</p>
              <button 
                className="product-page-button"
                onClick={handleProductPageClick}
                title="Go to Products Page"
              >
                ← Explore Products
              </button>
            </div>
          </footer>
        </div>
      </article>
    </div>
  );
};

export default BlogViews;
