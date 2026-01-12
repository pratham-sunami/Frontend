import React, { useEffect, useRef, useState } from "react";

const OTP = ({ otpLength = 6 }) => {
  const [otpFields, setOtpFields] = useState(new Array(otpLength).fill(""));
  const inputRef = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (isNaN(value)) return;

    const newOtp = [...otpFields];
    newOtp[index] = value.slice(-1); // only last digit
    setOtpFields(newOtp);

    // Move to next input
    if (value && index < otpFields.length - 1) {
      inputRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otpFields];
      newOtp[index] = "";
      setOtpFields(newOtp);
      if (index > 0) inputRef.current[index - 1].focus();
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRef.current[index - 1].focus();
    }

    if (e.key === "ArrowRight" && index < otpFields.length - 1) {
      inputRef.current[index + 1].focus();
    }
  };

  useEffect(() => {
    inputRef.current[0].focus();
  }, []);

  return (
    <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
      {otpFields.map((value, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={value}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => (inputRef.current[index] = el)}
          style={{
            width: "30px",
            height: "30px",
            textAlign: "center",
            fontSize: "18px",
          }}
        />
      ))}
    </div>
  );
};

export default OTP;
