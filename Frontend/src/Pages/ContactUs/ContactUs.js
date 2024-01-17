// author: Faizal

import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import "./ContactUs.css";

const ContactUs = () => {
  return (
    <>
      <Header />
      <Row className="m-3">
        <Col md={6}>
          <Card className="mb-3 mt-3 mt-md-0">
            <Card.Body>
              <Card.Title className="title">Address</Card.Title>
              <Card.Text className="subtitle">1333 South Park Street</Card.Text>
              <Card.Text className="subtitle">Halifax, NS</Card.Text>
              <Card.Text className="subtitle">B3J 2K9</Card.Text>
            </Card.Body>
          </Card>
          <Card className="my-3">
            <Card.Body>
              <Card.Title className="title">Phone Number</Card.Title>
              <Card.Text className="subtitle">
                <a href="tel:+11234567890">+1 123-456-7890</a>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="my-3">
            <Card.Body>
              <Card.Title className="title">Email Address</Card.Title>
              <Card.Text className="subtitle">
                <a href="mailto:info@example.com">info@example.com</a>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="title">Office Location</Card.Title>
              <Card.Text className="subtitle">
                <iframe
                  title="Office Location"
                  className="map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2838.870185739703!2d-63.57821449999999!3d44.6405701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4b5a22313967a661%3A0xd6a405faf6d878a3!2s1333%20South%20Park%20St%2C%20Halifax%2C%20NS%20B3J%202K9!5e0!3m2!1sen!2sca!4v1687277433606!5m2!1sen!2sca"
                  frameBorder="0"
                  style={{ border: "0", height: "50vh", width: "100%" }}
                  allowFullScreen=""
                  aria-hidden="false"
                  tabIndex="0"
                ></iframe>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Footer />
    </>
  );
};

export default ContactUs;
