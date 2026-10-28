import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../redux/thunks/authThunks.js";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error, loading } = useSelector((state) => state.auth);
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) dispatch(registerUser(form));
    else dispatch(loginUser({ email: form.email, password: form.password }));
  };

  return (
    <div style={{ maxWidth: 400 }}>
      <h2 className="mb-3">{isRegister ? "Register" : "Login"}</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        {isRegister && (
          <input className="form-control mb-2" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        )}
        <input className="form-control mb-2" type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input className="form-control mb-2" type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button className="btn btn-primary" disabled={loading}>
          {isRegister ? "Create account" : "Login"}
        </button>
      </form>
      <button className="btn btn-link px-0 mt-2" onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "Already have an account? Login" : "New here? Register"}
      </button>
    </div>
  );
}

export default Login;
