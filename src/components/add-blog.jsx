import { useState } from "react";

const Addblog = () => {
  const [name, setname] = useState("");
  const [blogcontain, setblogcontain] = useState("");
  const [description, setDescription] = useState("");
  const [image,setimage] =useState(null);
  const [message, setmessage] = useState("");
  const [success, setsuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("blogcontain", blogcontain);
    formData.append("description", description);
    formData.append("image",image)

    try {
      const res = await fetch("https://ayurvedab.vercel.app/admin/blog", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setmessage(data.message || "Blog added successfully!");
        setsuccess("success");

        // Clear form fields
        setname("");
        setblogcontain("");
        setDescription("");
      } else {
        setmessage("Something went wrong!");
        setsuccess("error");
      }
    } catch (error) {
      setmessage("Something went wrong!");
      setsuccess("error");
    }
  };

  return (
    <div className="product-page">
      <div className="product-container">
        <h2 className="product-title">Add New Blog</h2>

        <form className="product-form" onSubmit={handleSubmit}>
          {message && (
            <div
              className={`MASSAGE-BOX ${
                success === "success" ? "success" : "error"
              }`}
            >
              {message}
            </div>
          )}

          <div className="product-group">
            <label>Blog Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setname(e.target.value)}
              required
            />
          </div>

          <div className="product-group">
            <label>Blog Content</label>
            <textarea
              value={blogcontain}
              onChange={(e) => setblogcontain(e.target.value)}
              rows="4"
              required
            ></textarea>
          </div>

          <div className="product-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              required
            ></textarea>
          </div>

          <div className="product-group">
            <label>image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setimage(e.target.files[0])}
              
            />
          </div>

          <button type="submit" className="product-btn">
            Add Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addblog;
