//Author: Dhruvin Dankhara

import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;

export const postComment = async (eventId, commentText) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(
      `${baseUrl}/comment/post/${eventId}`,
      {
        text: commentText,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getAllCommentOfEvent = async (eventId, data) => {
  const token = localStorage.getItem("token");
  try {
    let queryParams = { limit: 5, createdAt: -1 };
    if (data) {
      if (data.limit) {
        queryParams = {
          ...queryParams,
          limit: data.limit,
        };
      } else if (data.createdAt) {
        queryParams = {
          ...queryParams,
          createdAt: data.createdAt,
        };
      } else {
        queryParams = {
          ...queryParams,
          limit: 5,
          createdAt: -1,
        };
      }
    }
    const response = await axios.get(`${baseUrl}/comment/${eventId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
