// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./bag.css";

// const Bag = () => {
//   const navogate = useNavigate();
//   const [massage, setmassage] = useState("");
//   const [status, setstatus] = useState("");
//   const [bagProduct, setbagProduct] = useState([]);
//   useEffect(() => {
//     fetch("http://localhost:3001/bag", {
//       credentials: "include",
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setbagProduct(data.BagProduct || []);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   const RemoveBagProduct = async (id) => {
//     try {
//       const res = await fetch("http://localhost:3001/bag/delete", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },

//         credentials: "include",

//         body: JSON.stringify({ id }),
//       });
//       const data = await res.json();
//       const BagProduct = data.BagProduct || [];
//       setbagProduct(BagProduct);
//         if(BagProduct.length===0){
//           setTimeout(() => {
//             navogate("/");
//           }, 2000);
//         }
//       if (data.success) {
//         setmassage(data.massage);
//         setstatus("success");
//       } else {
//         setmassage("please wait something wrong! ");
//         setstatus("error");
//       }
//     } catch (error) {
//       setmassage("something wrong !");
//       setstatus("error");
//     }
//   };
//   return (
//     <div className="product-wrapper">
//       {/* 🔔 Message Box */}
//       {massage && <div className={`MASSAGE-BOX ${status}`}>{massage}</div>}

//       <div className="fav-container">
//         <h1 className="fav-title">My Favorite Products</h1>

//         {bagProduct.length === 0 && (
//           <p className="fav-empty">No favorite products found.</p>
//         )}

//         <div className="fav-grid">
//           {bagProduct.map((item) => (
//             <div key={item._id} className="fav-card">
//               <div className="fav-image-box">
//                 <img
//                   src={`http://localhost:3001/${item.image}`}
//                   alt={item.name}
//                   className="fav-img"
//                 />
//               </div>
//               <button onClick={() => RemoveBagProduct(item._id)}>remove</button>
//               <h3 className="fav-name">{item.name}</h3>

//               <p className="fav-price">₹{item.price}</p>

//               <p className="fav-desc">{item.description}</p>

//               {item.discount > 0 && (
//                 <span className="fav-discount">-{item.discount}% OFF</span>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Bag;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./bag.css";

const Bag = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [bagProducts, setBagProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);

  useEffect(() => {
    fetch("https://ayurvedab.vercel.app/bag", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setBagProducts(data.BagProduct || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const removeBagProduct = async (id) => {
    try {
      setRemovingId(id);
      const res = await fetch("https://ayurvedab.vercel.app/bag/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id }),
      });
      
      const data = await res.json();
      const updatedBagProducts = data.BagProduct || [];
      
      setTimeout(() => {
        setBagProducts(updatedBagProducts);
        setRemovingId(null);

        if (data.success) {
          setMessage(data.message || "Item removed from bag");
          setStatus("success");
        } else {
          setMessage("Please wait, something went wrong!");
          setStatus("error");
        }

        if (updatedBagProducts.length === 0) {
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      }, 500);
      
    } catch (error) {
      setRemovingId(null);
      setMessage("Something went wrong!");
      setStatus("error");
    }
  };

  const clearMessage = () => {
    setMessage("");
    setStatus("");
  };

  const calculateTotal = () => {
    return bagProducts.reduce((total, item) => {
      const price = item.discount > 0 
        ? item.price * (1 - item.discount / 100)
        : item.price;
      return total + price;
    }, 0);
  };

  if (loading) {
    return (
      <div className="bag-loading">
        <div className="loading-spinner"></div>
        <p>Loading your bag...</p>
      </div>
    );
  }

  return (
    <div className="bag-page">
      {/* Notification Message */}
      {message && (
        <div 
          className={`bag-message ${status}`}
          onClick={clearMessage}
        >
          <div className="message-content">
            {status === "success" ? "✓" : "⚠"} {message}
          </div>
        </div>
      )}

      <div className="bag-container">
        <div className="bag-header">
          <h1 className="bag-title">🛍️ My Shopping Bag</h1>
          <p className="bag-subtitle">
            {bagProducts.length} {bagProducts.length === 1 ? 'item' : 'items'} in your bag
          </p>
        </div>

        {bagProducts.length === 0 ? (
          <div className="empty-bag">
            <div className="empty-bag-icon">🛒</div>
            <h2>Your bag is empty</h2>
            <p>Add some amazing products to get started!</p>
            <button 
              className="continue-shopping-btn"
              onClick={() => navigate("/product")}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="bag-content">
            <div className="bag-items">
              {bagProducts.map((item) => (
                <div 
                  key={item._id} 
                  className={`bag-item ${removingId === item._id ? 'removing' : ''}`}
                >
                  <div className="item-image">
                    <img
                      src={`https://ayurvedab.vercel.app/${item.image}`}
                      alt={item.name}
                    />
                    {item.discount > 0 && (
                      <div className="discount-tag">
                        -{item.discount}%
                      </div>
                    )}
                  </div>

                  <div className="item-details">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-description">
                      {item.description.length > 100 
                        ? `${item.description.substring(0, 100)}...` 
                        : item.description
                      }
                    </p>
                    
                    <div className="item-pricing">
                      {item.discount > 0 ? (
                        <div className="discount-pricing">
                          <span className="current-price">
                            ₹{Math.round(item.price * (1 - item.discount / 100))}
                          </span>
                          <span className="original-price">₹{item.price}</span>
                          <span className="savings">
                            You save ₹{Math.round(item.price * (item.discount / 100))}
                          </span>
                        </div>
                      ) : (
                        <span className="current-price">₹{item.price}</span>
                      )}
                    </div>
                  </div>

                  <button 
                    className={`remove-btn ${removingId === item._id ? 'removing' : ''}`}
                    onClick={() => removeBagProduct(item._id)}
                    disabled={removingId === item._id}
                  >
                    {removingId === item._id ? (
                      <div className="remove-loading"></div>
                    ) : (
                      'X'
                    )}
                  </button>
                </div>
              ))}
            </div>

            <div className="bag-summary">
              <div className="summary-card">
                <h3>Order Summary</h3>
                <div className="summary-row">
                  <span>Items ({bagProducts.length})</span>
                  <span>₹{calculateTotal().toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>FREE</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>₹{calculateTotal().toFixed(2)}</span>
                </div>
                <button className="checkout-btn">
                  Proceed to Checkout
                </button>
                <button 
                  className="continue-shopping-btn"
                  onClick={() => navigate("/product")}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bag;
