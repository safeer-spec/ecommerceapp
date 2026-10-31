import { useState } from "react";
import axiosInstance from "../api/axiosInstance.js"; // adjust path to wherever your axios file lives

const emptyForm = {
  name: "",
  price: "",
  description: "",
  image: "",
  category: "",
  stock: "",
};

function AddProduct() {
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      await axiosInstance.post("/products", {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      });
      setMessage("Product added!");
      setForm(emptyForm);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add product");
    }
  };

  return (
    <div style={{ maxWidth: 500 }}>
      <h2 className="mb-3">Add Product</h2>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input name="name" className="form-control mb-2" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="price" type="number" className="form-control mb-2" placeholder="Price" value={form.price} onChange={handleChange} required />
        <textarea name="description" className="form-control mb-2" placeholder="Description" value={form.description} onChange={handleChange} />
        <input name="image" className="form-control mb-2" placeholder="Image URL" value={form.image} onChange={handleChange} />
        <input name="category" className="form-control mb-2" placeholder="Category" value={form.category} onChange={handleChange} />
        <input name="stock" type="number" className="form-control mb-3" placeholder="Stock" value={form.stock} onChange={handleChange} />
        <button className="btn btn-dark">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;