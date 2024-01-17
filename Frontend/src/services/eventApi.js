//Author: Dhruvin Dankhara

import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;

export const createEvent = async (payload) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(`${baseUrl}/event/create`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateEvent = async (eventId, payload) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.put(
      `${baseUrl}/event/update/${eventId}`,
      payload,
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

export const getAllEvents = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${baseUrl}/event`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getAllMyEvents = async () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  try {
    const response = await axios.get(`${baseUrl}/event`, {
      params: {
        ownerId: userId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getEventDetailById = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${baseUrl}/event/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const setEventToComplete = async (eventId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${baseUrl}/event/complete/${eventId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const sendRequestApiCall = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const formData = new FormData();
    formData.append("image", data[0].originFileObj);
    console.log("INSIDE CONDITION", formData);
    const response = await axios.post(
      `${baseUrl}/admin/send-request`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return "response";
  } catch (error) {
    console.error(error);
    return null;
  }
};
