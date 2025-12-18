import { useState } from "react";
import "../styles/auth.css";
import { useNavigate } from "react-router-dom";


const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // NEW STATE (required for popup)
  const [popupMsg, setPopupMsg] = useState("");
  const [showPopup, setShowPopup] = useState(false);

 async function handleSubmit(e) {
  e.preventDefault();

  const res = await fetch("https://e-kart-qxqs.onrender.com/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  setPopupMsg(data.msg);
  setShowPopup(true);

  // ✅ Redirect to Home after successful login
  if (res.ok && data.token) {
    localStorage.setItem("token", data.token);
     localStorage.setItem("userEmail", email);

    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  }
}


  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="auth-title">
          <span>SIGN IN</span>
        </div>

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

        <button className="auth-button" type="submit">
          Sign In
        </button>
        
<p className="auth-footer">
  <a href="/forgot-password">Forgot password?</a>
</p>

        <p className="auth-footer">
          No account? <a href="/signup">Sign up</a>
        </p>
      </form>

      {/* Popup Modal */}
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

export default Signin;
