import { FaHandHoldingHeart, FaStar, FaTruck, FaShieldAlt, FaUndo, FaFire } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ViewProduct.css";

const ViewProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notification, setNotification] = useState("");
  const [notificationStatus, setNotificationStatus] = useState("");
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://ayurvedab.vercel.app/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.product);
        if (data.product) {
          const price = data.product.discount > 0
            ? Math.round(data.product.price - (data.product.price * data.product.discount) / 100)
            : data.product.price;
          setFinalPrice(price);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Product fetch error:", err);
        setIsLoading(false);
      });
  }, [id]);

  const handleAddToFavorite = async (id) => {
    try {
      const res = await fetch("https://ayurvedab.vercel.app/favourites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id:id }),
      });

      const data = await res.json();

      if (data.success) {
        setNotification("❤️ Added to favorites!");
        setNotificationStatus("success");
      } else {
        setNotification("🔐 Please login first...");
        setNotificationStatus("error");
        setTimeout(() => navigate("/login"), 1200);
      }
    } catch (error) {
      console.error("Favorite error:", error);
      setNotification("⚠️ Server error. Try again later.");
      setNotificationStatus("error");
    }
    
    setTimeout(() => setNotification(""), 2000);
  };

  const handleAddToBag = async (id) => {
    try {
      const res = await fetch("https://ayurvedab.vercel.app/bag", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id:id }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        setNotification("🛍️ Added to bag!");
        setNotificationStatus("success");
      } else {
        setNotification(data.error || "❌ Failed to add to bag");
        setNotificationStatus("error");
      }
    } catch (err) {
      setNotification("⚠️ Something went wrong!");
      setNotificationStatus("error");
    }
    
    setTimeout(() => setNotification(""), 2000);
  };

  const handleBuyNow = () => {
    setNotification("🚀 Proceeding to checkout...");
    setNotificationStatus("success");
    setTimeout(() => {
      // navigate("/checkout");
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="product-loading">
        Loading Product Details...
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-loading">
        Product not found
        <button onClick={() => navigate("/")} className="back-btn">
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="product-view-container">
      {notification && (
        <div className={`notification-box ${notificationStatus}`}>
          {notification}
        </div>
      )}
      
      <div className="product-display-card">
        {/* Left Side - Product Image */}
        <div className="product-image-section">
          <img
            src={`https://ayurvedab.vercel.app/${product.image}`}
            alt={product.name}
            className="product-main-image"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/600x500/4f46e5/ffffff?text=Product+Image';
            }}
          />
        </div>

        {/* Right Side - Product Information */}
        <div className="product-info-section">
          {/* Product Header */}
          <div className="product-header">
            <h1 className="product-title">{product.name}</h1>
            
            {/* Rating Section */}
            <div className="product-rating">
              {[...Array(5)].map((_, i) => (
                <FaStar 
                  key={i} 
                  className={`star-icon ${i < 4 ? 'active-star' : ''}`} 
                />
              ))}
              <span className="rating-text">(4.2 • 128 reviews)</span>
            </div>
          </div>

          {/* Category */}
          <span className="product-category">{product.category}</span>

          {/* Description */}
          <div className="description-section">
            <h3 className="section-title">Product Description</h3>
            <p className="product-description">{product.description}</p>
          </div>

          {/* Price Section */}
          <div className="price-display-section">
            <div className="price-content">
              <span className="current-price">{finalPrice}</span>
              {product.discount > 0 && (
                <>
                  <span className="original-price">₹{product.price}</span>
                  <span className="discount-badge">-{product.discount}% OFF</span>
                </>
              )}
            </div>
            
            {/* Savings */}
            {product.discount > 0 && (
              <div className="savings-info">
                You save ₹{product.price - finalPrice}
              </div>
            )}
          </div>

          {/* Stock Status */}
          {product.stock <= 10 && (
            <div className={`stock-status ${product.stock <= 5 ? 'low-stock' : ''}`}>
              <FaFire className="stock-icon" />
              Only {product.stock} items left in stock
            </div>
          )}

          {/* Action Buttons */}
          <div className="action-buttons-group">
            <button 
              className="secondary-action-btn favorite-btn"
              onClick={()=>handleAddToFavorite(product._id)}
              title="Add to Favorites"
              aria-label="Add to favorites"
            >
              <FaHandHoldingHeart />
            </button>
            
            <button 
              className="secondary-action-btn bag-btn"
              onClick={ ()=>handleAddToBag( product._id)}
              title="Add to Shopping Bag"
              aria-label="Add to shopping bag"
            >
             
            </button>
            
            <button 
              className="primary-action-btn"
              onClick={handleBuyNow}
              aria-label="Buy now"
            >
              BUY NOW
            </button>
          </div>

          {/* Features */}
          <div className="product-features">
            <div className="feature-item">
              <FaTruck className="feature-icon" />
              <div className="feature-content">
                <h4 className="feature-title">Free Delivery</h4>
                <p className="feature-desc">Delivery within 2-3 days</p>
              </div>
            </div>
            
           
            
            <div className="feature-item">
              <FaUndo className="feature-icon" />
              <div className="feature-content">
               
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="additional-details">
            <h3 className="section-title">Product Details</h3>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">SKU:</span>
                <span className="detail-value">{product._id?.slice(-8)}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Category:</span>
                <span className="detail-value">{product.category}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">In Stock:</span>
                <span className="detail-value">{product.instock} </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
