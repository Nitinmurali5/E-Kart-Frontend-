import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/auth.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
   const [popupMsg, setPopupMsg] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();


  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");

    const res = await fetch("https://e-kart-qxqs.onrender.com/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();
    // REPLACED alert()
    setPopupMsg(data.msg);
    setShowPopup(true);
    if (res.ok) {
  setTimeout(() => {
    navigate("/signin");
  }, 1500);
}
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="auth-title">
          <span>SIGN UP</span>
        </div>

        <input
          className="auth-input"
          placeholder="Name"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="auth-input"
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="auth-input"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="auth-input"
          placeholder="Confirm Password"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && <p className="error-text">{error}</p>}

        <button className="auth-button">Sign Up</button>

        <p className="auth-footer">
          Already have an account? <a href="/signin">Sign in</a>
        </p>
      </form>
       {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <p>{popupMsg}</p>
            <button
              className="popup-btn"
              onClick={() => setShowPopup(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
