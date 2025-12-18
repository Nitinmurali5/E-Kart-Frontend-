import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [popupMsg, setPopupMsg] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("https://e-kart-qxqs.onrender.com/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    const data = await res.json();

    setPopupMsg(data.msg);
    setShowPopup(true);

    // ✅ Redirect to Reset Password page after OTP sent
    if (res.ok) {
      setTimeout(() => {
        navigate("/reset-password", { state: { email } });
      }, 1500);
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="auth-title">
          <span>FORGOT PASSWORD</span>
        </div>

        <input
          className="auth-input"
          type="email"
          placeholder="Enter registered email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button className="auth-button" type="submit">
          Send OTP
        </button>

        <p className="auth-footer">
          Back to <a href="/signin">Sign in</a>
        </p>
      </form>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <p>{popupMsg}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
