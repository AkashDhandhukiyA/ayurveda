import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./updateproduct.css";
const UpdateProduct = () => {
  const { id } = useParams();

  const [preview, setPreview] = useState(""); // for image preview
  const [form, setForm] = useState({
    name: "",
    category: "",
    brand: "",
    description: "",
    price: "",
    discount: "",
    rating: "",
    ingredients: "",
    stock: "",
    instock: true,
    image: null, // new image
  });

  // Fetch product
  useEffect(() => {
    fetch(`https://ayurvedab.vercel.app/admin/viewProduct/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const p = data.product;

        setForm({
          name: p.name,
          category: p.category,
          brand: p.brand,
          description: p.description,
          price: p.price,
          discount: p.discount,
          rating: p.rating,
          ingredients: p.ingredients.join(", "), // convert array → string
          stock: p.stock,
          instock: p.instock,
          image: null,
        });

        setPreview(`https://ayurvedab.vercel.app/uploads/${p.image}`);
      });
  }, [id]);

  // Handle ALL text fields
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Checkbox
  const handleCheckbox = (e) => {
    setForm({ ...form, instock: e.target.checked });
  };

  // Image handler
  const handleImage = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });
    setPreview(URL.createObjectURL(file)); // preview new image
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();

    fd.append("name", form.name);
    fd.append("category", form.category);
    fd.append("brand", form.brand);
    fd.append("description", form.description);
    fd.append("price", form.price);
    fd.append("discount", form.discount);
    fd.append("rating", form.rating);
    fd.append("stock", form.stock);
    fd.append("instock", form.instock);

    // Ingredients → Array
    fd.append(
      "ingredients",
      JSON.stringify(form.ingredients.split(",").map((i) => i.trim()))
    );

    if (form.image) {
      fd.append("image", form.image);
    }

    const res = await fetch(`https://ayurvedab.vercel.app/admin/updateproduct/${id}`, {
      method: "PUT",
      body: fd,
    });

    const result = await res.json();
    alert(result.message);
  };

  return (
    <form onSubmit={handleSubmit} className="add-product-form">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Product Name"
      />

      <select name="category" value={form.category} onChange={handleChange}>
        <option value="">Select Category</option>
        <option value="Ayurvedic">Ayurvedic</option>
        <option value="Cosmetic">Cosmetic</option>
        <option value="Food">Food</option>
        <option value="Herbal">Herbal</option>
        <option value="Other">Other</option>
      </select>

      <input
        name="brand"
        value={form.brand}
        onChange={handleChange}
        placeholder="Brand"
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
      ></textarea>

      <input
        name="price"
        type="number"
        value={form.price}
        onChange={handleChange}
      />
      <input
        name="discount"
        type="number"
        value={form.discount}
        onChange={handleChange}
      />
      <input
        name="rating"
        type="number"
        value={form.rating}
        onChange={handleChange}
      />

      <input
        name="ingredients"
        value={form.ingredients}
        onChange={handleChange}
      />

      <input
        name="stock"
        type="number"
        value={form.stock}
        onChange={handleChange}
      />

      <label>
        <input
          type="checkbox"
          checked={form.instock}
          onChange={handleCheckbox}
        />
        In Stock
      </label>

      <input type="file" onChange={handleImage} />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          width="140"
          style={{ marginTop: "10px", borderRadius: "10px" }}
        />
      )}

      <button type="submit">Update Product</button>
    </form>
  );
};

export default UpdateProduct;
