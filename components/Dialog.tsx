import React from "react";

const Dialog = ({ isOpen, onClose, title, otp, setOtp, handleVerify }) => {
  const handleChange = (index, value) => {
    const otpArray = otp.split("");
    otpArray[index] = value;

    const filteredOtp = otpArray.filter((digit) => digit);
    setOtp(filteredOtp.join(""));

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index]) {
      const previousInput = document.getElementById(`otp-input-${index - 1}`);
      if (previousInput) previousInput.focus();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <div className="dialog-header">
          <h2>{title}</h2>
          <button onClick={onClose} className="close-button">
            <img src="/assets/icons/close.svg" alt="Close" />
          </button>
        </div>
        <div className="sub">
          <h3>Please enter the OTP sent to your registered mobile number.</h3>
        </div>
        <div className="otp-input-container">
          {Array.from({ length: 6 }).map((_, index) => (
            <input
              key={index}
              type="text"
              id={`otp-input-${index}`}
              maxLength={1}
              value={otp[index] || ""}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              placeholder="0"
              className={`otp-input ${otp[index] ? "highlight" : ""}`}
            />
          ))}
        </div>
        <button className="verify-button" onClick={handleVerify}>
          Verify
        </button>
      </div>
    </div>
  );
};

export default Dialog;
