import { useState } from "react";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // This is a simple demo form: it does not send the message anywhere
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div style={{ maxWidth: 500 }}>
      <h2 className="mb-3">Contact Us</h2>
      {sent && <div className="alert alert-success">Thanks! We got your message.</div>}
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input className="form-control mb-2" type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <textarea className="form-control mb-2" name="message" rows="4" placeholder="Message" value={form.message} onChange={handleChange} required />
        <button className="btn btn-primary">Send</button>
      </form>
    </div>
  );
}

export default Contact;
