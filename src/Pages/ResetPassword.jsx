import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/auth.css";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [popupMsg, setPopupMsg] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("https://e-kart-qxqs.onrender.com/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp, newPassword })
    });

    const data = await res.json();
    setPopupMsg(data.msg);
    setShowPopup(true);

    // ✅ Redirect to Signin after success
    if (res.ok) {
      setTimeout(() => navigate("/signin"), 2000);
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="auth-title">
          <span>RESET PASSWORD</span>
        </div>

        <input
          className="auth-input"
          value={email}
          disabled
        />

        <input
          className="auth-input"
          placeholder="Enter OTP"
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        <input
          className="auth-input"
          placeholder="New Password"
          type="password"
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <button className="auth-button" type="submit">
          Reset Password
        </button>
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

export default ResetPassword;
