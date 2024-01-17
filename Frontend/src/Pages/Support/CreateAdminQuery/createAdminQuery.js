//author: Vatsal

import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import "./createAdminQuery.css";
import { useParams } from "react-router-dom";

function CreateAdminQuery() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const { userId } = useParams();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (title.trim() === "" || description.trim() === "") {
      setError("Please fill in all the fields.");
      return;
    }

    const apiUrl =
      process.env.REACT_APP_BASE_URL + "/support/adminQuery/" + userId;
    const data = {
      title: title,
      description: description,
    };

    axios
      .post(apiUrl, data)
      .then((response) => {
        console.log("API call successful:", response.data.data);
        setTitle("");
        setDescription("");
        setError("");
      })
      .catch((error) => {
        console.error("API call failed:", error);
      });
  };

  return (
    <div className="container mt-4 col-8">
      <h1 className="heading text-start">Admin Query</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Control
            type="text"
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
          />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </Form.Group>
        <Button variant="dark" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default CreateAdminQuery;
