//Author: Dhruvin Dankhara

import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;

export const giveRating = async (eventId, rating) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(
      `${baseUrl}/rate/${eventId}`,
      {
        rating: rating,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchRating = async (eventId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${baseUrl}/rate/${eventId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
