import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Viewadminproduct = () => {
  const [product, setproduct] = useState([]);
  const navigate = useNavigate();
  const [message, setmessage] = useState("");
  const [status, setstatus] = useState("");

  useEffect(() => {
    fetch("https://ayurvedab.vercel.app/product", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setproduct(data.product || []);
      });
  }, []);

  const handledeleteProduct = async (id) => {
    try {
      const res = await fetch(`https://ayurvedab.vercel.app/admin/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({id})
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
  return (
    <>
     <div className="product-wrapper">

{/* 🔔 Message Box */}
{message && (
  <div className={`MASSAGE-BOX ${status}`}>
    {message}
  </div>
)}
      <div className="product-page">
        <div className="product-grid">
          {product.map((p) => {
            const finalPrice =
              p.discount > 0
                ? Math.round(p.price - (p.price * p.discount) / 100)
                : p.price;

            return (
              <div key={p._id} className="product-card">
                <div className="product-img">
                  <img
                    src={`https://ayurvedab.vercel.app/${p.image}`}
                    alt={p.name}
                    loading="lazy"
                  />
                </div>

                {/* Info */}
                <div className="product-info">
                  <h2>{p.name}</h2>
                  <p className="category">{p.category}</p>
                  <p className="category">{p.rating}</p>
                  <p className="category">{p.ingredients}</p>
                  <p className="category">{p.category}</p>
                  <p className="category">{p.brand}</p>
                  <p className="category">{p.stock}</p>
                  <p className="category">{p.instock}</p>
                  <p className="desc">{p.description?.slice(0, 80)}...</p>

                  <div className="price">
                    {p.discount > 0 ? (
                      <>
                        <span className="old-price">₹{p.price}</span>
                        <span className="new-price">₹{finalPrice}</span>
                        <small className="discount-tag">
                          {p.discount}% OFF
                        </small>
                      </>
                    ) : (
                      <span className="new-price">₹{p.price}</span>
                    )}
                  </div>

                  <button
                    onClick={() => navigate(`/admin/updateproduct/${p._id}`)}
                    className="view-btn"
                  >
                    UPDATE PRODUCT
                  </button>
                  <button onClick={()=>handledeleteProduct(p._id)} className="view-btn">
                    DELETE PRODUCT
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </div>
    </>
  );
};
export default Viewadminproduct;
