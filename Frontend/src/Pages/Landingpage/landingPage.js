/* author: Mehulkumar Bhunsadiya */
import { useNavigate } from "react-router-dom";
import React from "react";
import "./LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();

  const handleGetStarted = (e) => {
    e.preventDefault();
    navigate("/registration");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const handleGetFaqs = (e) => {
    e.preventDefault();
    navigate("/faqs");
  };
  const handleGetContactus = (e) => {
    e.preventDefault();
    navigate("/contact");
  };

  return (
    <div className="landing-page">
      <div className="parent-container">
        <div className="overlay"></div>
        <div className="contact-faq-container">
            <span className="login-link" onClick={handleLogin}>
            Login
          </span>
          <span className="contact-link" onClick={handleGetContactus}>
            Contact
          </span>
          <span className="faq-link" onClick={handleGetFaqs}>
            FAQ
          </span>
        </div>
        <div className="text-container">
          <h1 className="display-4 title-landing">
            Revolutionize Event Planning
          </h1>
          <p className="lead sub-title">
            Transform Your Events with Our Management App
          </p>
          <div className="button-container">
            <button
              className="btn start-btn btn-lg"
              onClick={handleGetStarted}
            >
              Let's Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
