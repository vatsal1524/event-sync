//author: Vatsal

import React, { useEffect, useState } from "react";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function Faqs() {
  const [faqs, setFaqs] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchFaqs();
  }, []);

  const navigate = useNavigate();

  const fetchFaqs = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BASE_URL + "/support/faqs"
      );
      setFaqs(response.data.data);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    }
  };

  const handleContactSupport = () => {
    window.location.href = "mailto:eventsyncdal@gmail.com";
  };

  return (
    <div className="container mt-4 col-8">
      <h1 className="text-start">Frequently Asked Questions</h1>
      <Accordion className="mt-4">
        {faqs.map((faq, index) => (
          <Accordion.Item key={index} eventKey={index.toString()}>
            <Accordion.Header className="accordion-header">
              {faq.question}
            </Accordion.Header>
            <Accordion.Body className="accordion-body text-start">
              {faq.answer}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
      <div className="d-grid gap-2 mt-4 d-md-flex justify-content-md-center">
        {userId && (
          <>
            <Button
              variant="warning"
              onClick={() => {
                navigate("/view-admin-query/" + userId);
              }}
            >
              View Admin Queries
            </Button>
            <Button
              variant="warning"
              onClick={() => {
                navigate("/create-admin-query/" + userId);
              }}
            >
              Create Admin Query
            </Button>
          </>
        )}
        <Button variant="dark" onClick={handleContactSupport}>
          Contact Support
        </Button>
      </div>
    </div>
  );
}

export default Faqs;
