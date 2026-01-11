import React, { useEffect, useState } from "react";
import "./Product.css"; // Use the CSS above
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const Product = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState({});
  const [massage, setmassage] = useState("");
  const [status, setstatus] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("https://ayurvedab.vercel.app/product")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.product);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  const toggleFavorite = async (id, e) => {
    e.stopPropagation();

    // Instant UI update
    setFavorite((prev) => ({ ...prev, [id]: !prev[id] }));

    try {
      const res = await fetch("http://localhost:3001/favourites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (data.success) {
        setmassage(data.message);
        setstatus("success");
      } else {
        setmassage("PLEASE LOGIN FIRST...");
        setstatus("error");
        setTimeout(() => navigate("/login"), 1000);
      }
    } catch (error) {
      console.log("Favorite error:", error);
      setmassage("Something went wrong!");
      setstatus("error");
    }

    setTimeout(() => setmassage(""), 1600);
  };

  // Enhanced loading skeleton
  if (loading) {
    return (
      <div className="product-wrapper">
        <div className="skeleton-grid">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="skeleton-card">
              <div className="skeleton-image"></div>
              <div className="skeleton-title"></div>
              <div className="skeleton-category"></div>
              <div className="skeleton-desc"></div>
              <div className="skeleton-desc short"></div>
              <div className="skeleton-price"></div>
              <div className="skeleton-button"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="product-wrapper">
      {massage && (
        <div className={`MASSAGE-BOX ${status}`}>
          {massage}
        </div>
      )}

      <div className="product-page">
        <div className="product-grid">
          {products.map((p, index) => {
            const finalPrice =
              p.discount > 0
                ? Math.round(p.price - (p.price * p.discount) / 100)
                : p.price;

            return (
              <div
                key={p._id}
                className="product-card"
                style={{ '--card-index': index }}
                onClick={() => navigate(`/viewProduct/${p._id}`)}
              >
                <div 
                  className={`heart-icon ${favorite[p._id] ? 'active' : ''}`}
                  onClick={(e) => toggleFavorite(p._id, e)}
                >
                  <FaHeart className={favorite[p._id] ? "heart active" : "heart"} />
                </div>

                <div className="product-img">
                  <img
                    src={`https://ayurvedab.vercel.app/${p.image}`}
                    alt={p.name}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x280/4f46e5/ffffff?text=Product+Image';
                    }}
                  />
                </div>

                <div className="product-info">
                  <h2>{p.name}</h2>
                  <p className="category">{p.category}</p>
                  <p className="desc">
                    {p.description?.length > 80 
                      ? `${p.description.slice(0, 80)}...` 
                      : p.description}
                  </p>
                  
                  {p.stock <= 5 && (
                    <div className="low-stock">
                      Only {p.stock} items left!
                    </div>
                  )}
                  
                  <div className="price">
                    {p.discount > 0 ? (
                      <>
                        <span className="old-price">₹{p.price}</span>
                        <span className="new-price">{finalPrice}</span>
                        <span className="discount-tag">{p.discount}% OFF</span>
                      </>
                    ) : (
                      <span className="new-price">{p.price}</span>
                    )}
                  </div>

                  <button 
                    className="view-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/viewProduct/${p._id}`);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Product;
