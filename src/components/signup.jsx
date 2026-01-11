import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./signup.css";

const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [secretkey, setsecretkey] = useState("");
  const [userType, setusertype] = useState("User");
  const Navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const onsenddata = async (e) => {
    e.preventDefault();
    
    if (userType === "Admin" && secretkey !== "AyURdeva@#904") {
      alert("Invalid Admin Key");
      return;
    }

    setErrors([]);

    let result = await fetch("https://ayurvedab.vercel.app/register", {
      method: "POST",
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        password,
        confirmpassword,
        userType,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();

    if (result.success) {
      alert("Registration successful!");
      setTimeout(() => {
        Navigate("/login");
      }, 1000);
    } else if (result.errors) {
      setErrors(result.errors);
    } else {
      alert("Something went wrong!");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <div className="signup-header">
          <h2>Create Account</h2>
          <p>Join our community today</p>
        </div>

        {errors.length > 0 && (
          <div className="error-alert">
            {errors.map((err, index) => (
              <div key={index} className="error-message">
                ⚠️ {err.msg}
              </div>
            ))}
          </div>
        )}

        <form onSubmit={onsenddata} className="signup-form">
          {/* User Type Selection */}
          <div className="user-type-container">
            <label className="user-type-label">Account Type</label>
            <div className="user-type-buttons">
              <button
                type="button"
                className={`user-type-btn ${userType === "User" ? "active" : ""}`}
                onClick={() => setusertype("User")}
              >
                <span className="btn-check"></span>
                <span>User</span>
              </button>
              <button
                type="button"
                className={`user-type-btn ${userType === "Admin" ? "active" : ""}`}
                onClick={() => setusertype("Admin")}
              >
                <span className="btn-check"></span>
                <span>Admin</span>
              </button>
            </div>
          </div>

          {/* Admin Secret Key */}
          {userType === "Admin" && (
            <div className="form-group">
              <label htmlFor="secretkey" className="form-label">
                Admin Secret Key
              </label>
              <input
                type="password"
                id="secretkey"
                value={secretkey}
                onChange={(e) => setsecretkey(e.target.value)}
                placeholder="Enter admin secret key"
                className="form-input"
                required
              />
              <small className="form-hint">Required for admin registration</small>
            </div>
          )}

          {/* Name Fields */}
          <div className="name-grid">
            <div className="form-group">
              <label htmlFor="firstname" className="form-label">
                First Name
              </label>
              <input
                type="text"
                id="firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                placeholder="John"
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastname" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                placeholder="Doe"
                className="form-input"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className="form-input"
              required
            />
          </div>

          {/* Password Fields */}
          <div className="password-grid">
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create password"
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmpassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmpassword"
                value={confirmpassword}
                onChange={(e) => setConfirmpassword(e.target.value)}
                placeholder="Confirm password"
                className="form-input"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-btn">
            Create Account
          </button>

          {/* Login Link */}
          <div className="login-link">
            Already have an account?{" "}
            <Link to="/login" className="link">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
