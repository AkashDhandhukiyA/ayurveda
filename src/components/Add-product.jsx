import React, { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [rating, setRating] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [stock, setStock] = useState("");
  const [inStock, setInStock] = useState(false);
  const [image, setImage] = useState(null);

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // ✅ Use FormData for file + text fields
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("brand", brand);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("discount", discount);
    formData.append("rating", rating);
    formData.append("ingredients", ingredients);
    formData.append("stock", stock);
    formData.append("inStock", inStock);
    if (image) formData.append("image", image);

    try {
      const response = await fetch("https://ayurvedab.vercel.app/admin/Add-Product", {
        method: "POST",
        body: formData, // ✅ No headers, browser sets them automatically
      });

      const result = await response.json();
      console.log(result);

      if (result.success) {
        setMessage("Product saved successfully ✅");
        setSuccess("success");

        // ✅ Clear form
        setName("");
        setCategory("");
        setBrand("");
        setDescription("");
        setPrice("");
        setDiscount("");
        setRating("");
        setIngredients("");
        setStock("");
        setInStock(false);
        setImage(null);
      } else {
        setMessage("Failed to save product ❌");
        setSuccess("error");
      }
    } catch (err) {
      console.error("Error:", err);
      setMessage("Server error ❌");
      setSuccess("error");
    }
  };

  return (
    <div className="product-page">
      <div className="product-container">
        <h2 className="product-title">Add New Product</h2>
        <p className="product-subtitle">Fill in the product details below</p>

        <form className="product-form" onSubmit={handleSubmit}>
          {/* ✅ Message Box */}
          {message && (
            <div
              className={`MASSAGE-BOX ${
                success === "success" ? "success" : "error"
              }`}
            >
              {message}
            </div>
          )}

          {/* Product Name & Brand */}
          <div className="product-row">
            <div className="product-group half">
              <label>Product Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="product-group half">
              <label>Brand</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Enter brand"
                required
              />  
            </div>
          </div>

          {/* Price */}
          <div className="product-row">
            <div className="product-group half">
              <label>Price (₹)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
                required
              />
            </div>
          </div>

          {/* Category */}
          <div className="product-group">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">-- Select Category --</option>
              <option value="Ayurvedic">Ayurvedic</option>
              <option value="Cosmetic">Cosmetic</option>
              <option value="Food">Food</option>
              <option value="Herbal">Herbal</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Discount & Rating */}
          <div className="product-row">
            <div className="product-group half">
              <label>Discount (%)</label>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                placeholder="Enter discount"
              />
            </div>

            <div className="product-group half">
              <label>Rating (1–5)</label>
              <input
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                placeholder="Enter rating"
                min="1"
                max="5"
              />
            </div>
          </div>

          {/* Description */}
          <div className="product-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description"
              rows="4"
            ></textarea>
          </div>

          <div className="product-group">
            <label>Ingredients</label>
            <input
              type="text"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="Comma-separated"
            />
          </div>

          <div className="product-group half">
            <label>Stock</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </div>

          <div className="product-group">
            <label>
              <input
                type="checkbox"
                checked={inStock}
                onChange={(e) => setInStock(e.target.checked)}
              />{" "}
              In Stock
            </label>
          </div>

          <div className="product-group">
            <label>Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>

          <button type="submit" className="product-btn">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
