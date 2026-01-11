import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [massage, setmassage] = useState("");
  const [status, setstatus] = useState("");
  const navigate = useNavigate();

  const onLogin = async () => {
    console.log(email, password);
    let result = await fetch("https://ayurvedab.vercel.app/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include", // <-- Add this!
    });

    result = await result.json();
    console.log(result);

    if (result.success) {
      setmassage("Login Successful!");
      setstatus("success");
      if (result.user.userType === "Admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } else {
      setmassage("User not found!");
      setstatus("error");
      navigate("/login"); // redirect to main page
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Login to your account</h2>
        <p className="login-subtitle">welcome</p>
        {massage && (
          <div
            className={`MASSAGE-BOX ${
              status === "success" ? "success" : "error"
            }`}
          >
            {massage}
          </div>
        )}
        <div className="login-form" onSubmit={onLogin}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn" onClick={onLogin}>
            Login
          </button>

          <p className="signup-text">
            Don’t have an account? <a href="signup">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
