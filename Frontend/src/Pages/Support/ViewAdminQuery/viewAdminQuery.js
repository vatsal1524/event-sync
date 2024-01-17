//author: Vatsal

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Form } from "react-bootstrap";
import "./viewAdminQuery.css";
import { useParams } from "react-router-dom";

function ViewAdminQuery() {
  const [queries, setQueries] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");

  const { userId } = useParams();

  useEffect(() => {
    fetchAdminQueries();
  }, []);

  const fetchAdminQueries = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BASE_URL + "/support/adminquery/" + userId
      );
      setQueries(response.data.data);
    } catch (error) {
      console.error("Error fetching admin queries:", error);
    }
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const filteredQueries =
    selectedStatus === "All"
      ? queries
      : queries.filter((query) => query.status === selectedStatus);

  return (
    <div className="container mt-4 col-8">
      <h1 className="text-start">Admin Queries</h1>
      <div className="admin-query-container">
        <Form>
          <Form.Check
            type="radio"
            label="Open"
            value="open"
            checked={selectedStatus === "open"}
            onChange={handleStatusChange}
          />
          <Form.Check
            type="radio"
            label="Closed"
            value="closed"
            checked={selectedStatus === "closed"}
            onChange={handleStatusChange}
          />
          <Form.Check
            type="radio"
            label="All"
            value="All"
            checked={selectedStatus === "All"}
            onChange={handleStatusChange}
          />
        </Form>

        {filteredQueries.length > 0 ? (
          filteredQueries.map((query) => (
            <Card key={query._id} className="mb-3">
              <Card.Header className="text-start">
                Created On: {new Date(query.createdAt).toLocaleString()}
              </Card.Header>
              <Card.Body>
                <Card.Title className="text-start">
                  Status: {query.status}
                </Card.Title>
                <Card.Text className="text-start">
                  <b>Title:</b> {query.title}
                </Card.Text>
                <Card.Text className="d-none d-md-block text-start">
                  <b>Description:</b> {query.description}
                </Card.Text>
                {query.response !== "" && (
                  <Card.Text className="text-start">
                    <b>Response:</b> {query.response}
                  </Card.Text>
                )}
              </Card.Body>
            </Card>
          ))
        ) : (
          <Card className="mb-3">
            <Card.Body>No queries found.</Card.Body>
          </Card>
        )}
      </div>
    </div>
  );
}

export default ViewAdminQuery;
