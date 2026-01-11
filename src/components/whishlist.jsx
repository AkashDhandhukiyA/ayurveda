import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingBag, FaTrash, FaArrowRight } from "react-icons/fa";
import "./whishlist.css";

const Wishlist = () => {
  const navigate = useNavigate();
  const [notification, setNotification] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = () => {
    setLoading(true);
    fetch("http://localhost:3001/favourites", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setWishlist(data.favoriteProducts || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching wishlist:", err);
        setLoading(false);
      });
  };

  const removeFromWishlist = async (id, name) => {
    try {
      const res = await fetch("http://localhost:3001/favourites/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id }),
      });
      
      const data = await res.json();
      setWishlist(data.favoriteProducts || []);
      showNotification(`Removed "${name}"`);
      
      if (data.favoriteProducts.length === 0) {
        setTimeout(() => {
          showNotification("Wishlist is empty");
        }, 1000);
      }
    } catch (error) {
      showNotification("Failed to remove item");
    }
  };

  const addToCart = async (product) => {
    try {
      const res = await fetch("http://localhost:3001/bag", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: product._id }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        showNotification(`Added "${product.name}" to cart`);
      } else {
        showNotification("Please login first");
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (err) {
      showNotification("Failed to add to cart");
    }
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 2000);
  };

  const calculateFinalPrice = (price, discount) => {
    return discount > 0 
      ? Math.round(price - (price * discount / 100))
      : price;
  };

  // Calculate statistics
  const totalItems = wishlist.length;
  const totalValue = wishlist.reduce((sum, item) => sum + item.price, 0);
  const totalSavings = wishlist.reduce((sum, item) => {
    if (item.discount > 0) {
      return sum + (item.price * item.discount / 100);
    }
    return sum;
  }, 0);

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p className="loading-text">Loading wishlist...</p>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      {/* Notification */}
      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}

      {/* Header */}
      <div className="wishlist-header">
        <h1 className="wishlist-title">
          <FaHeart className="wishlist-icon" />
          My Wishlist
        </h1>
        <p className="wishlist-subtitle">
          Your saved favorites in one place
        </p>
      </div>

      {/* Empty State */}
      {wishlist.length === 0 ? (
        <div className="empty-wishlist">
          <div className="empty-heart">
            <FaHeart />
          </div>
          <h2 className="empty-title">Wishlist is empty</h2>
          <p className="empty-text">
            Add products you love by clicking the heart icon
          </p>
          <button 
            className="action-button primary-button"
            onClick={() => navigate("/")}
          >
            <FaShoppingBag style={{ marginRight: '8px' }} />
            Browse Products
          </button>
        </div>
      ) : (
        <div className="wishlist-container">
          {/* Statistics */}
          <div className="wishlist-stats">
            <div className="stat-card">
              <div className="stat-value">{totalItems}</div>
              <div className="stat-label">Items</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">₹{totalValue.toLocaleString()}</div>
              <div className="stat-label">Total Value</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">₹{Math.round(totalSavings).toLocaleString()}</div>
              <div className="stat-label">You Save</div>
            </div>
          </div>

          {/* Wishlist Grid */}
          <div className="wishlist-grid">
            {wishlist.map((item) => (
              <div key={item._id} className="product-card">
                {/* Remove Button */}
                <button 
                  className="remove-button"
                  onClick={() => removeFromWishlist(item._id, item.name)}
                  title="Remove from wishlist"
                >
                  <FaTrash />
                </button>

                {/* Product Image */}
                <div 
                  className="product-image-container"
                  onClick={() => navigate(`/viewProduct/${item._id}`)}
                >
                  <img
                    src={`http://localhost:3001/${item.image}`}
                    alt={item.name}
                    className="product-image"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200/e5e7eb/6b7280?text=Product';
                    }}
                  />
                  {item.discount > 0 && (
                    <div className="discount-badge">
                      -{item.discount}% OFF
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="product-info">
                  <h3 className="product-name">{item.name}</h3>
                  <span className="product-category">{item.category}</span>
                  
                  <p className="product-description">
                    {item.description?.length > 80 
                      ? `${item.description.substring(0, 80)}...` 
                      : item.description}
                  </p>

                  {/* Price */}
                  <div className="price-section">
                    <div>
                      <span className="current-price">
                        {calculateFinalPrice(item.price, item.discount)}
                      </span>
                      {item.discount > 0 && (
                        <>
                          <span className="original-price">₹{item.price}</span>
                          <div className="savings">
                            Save ₹{Math.round(item.price * item.discount / 100)}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="card-actions">
                    <button 
                      className="card-button view-button"
                      onClick={() => navigate(`/viewProduct/${item._id}`)}
                    >
                      View Details
                    </button>
                    <button 
                      className="card-button cart-button"
                      onClick={() => addToCart(item)}
                    >
                      <FaShoppingBag style={{ marginRight: '6px' }} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Continue Shopping */}
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <button 
              className="action-button secondary-button"
              onClick={() => navigate("/")}
              style={{ display: 'inline-flex', alignItems: 'center' }}
            >
              Continue Shopping
              <FaArrowRight style={{ marginLeft: '8px' }} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;