import React, { useState, useEffect, useCallback, useRef } from "react";
import ToastContainer from "react-bootstrap/ToastContainer";
import BootstrapToast from "./toasts";
import firebase from "firebase/compat/app";
import "firebase/compat/messaging";

//reference: https://www.makeuseof.com/push-notifications-in-react-using-firebase/
//reference: https://www.youtube.com/watch?v=BsCBCudx58g
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FCM_APIKEY,
  authDomain: process.env.REACT_APP_FCM_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FCM_PROJECTID,
  storageBucket: process.env.REACT_APP_FCM_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FCM_MESSANGINGSENDERID,
  appId: process.env.REACT_APP_FCM_APPID,
  measurementId: process.env.REACT_APP_FCM_MEASUREMENTID,
};

const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

const requestPermission = () => {
  console.log("Requesting User Permission......");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification User Permission Granted.");
      return messaging
        .getToken({
          vapidKey: process.env.REACT_APP_FCM_VAPIDKEY,
        })
        .then((currentToken) => {
          if (currentToken) {
            console.log("Client Token: ", currentToken);
            localStorage.setItem("fcmToken", currentToken);
          } else {
            console.log("Failed to generate the app registration token.");
          }
        })
        .catch((err) => {
          console.log(
            "An error occurred when requesting to receive the token.",
            err
          );
        });
    } else {
      console.log("User Permission Denied.");
    }
  });
};

const ToastComponent = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    requestPermission();
    // registerServiceWorker();
    messaging.onMessage((payload) => {
      console.log(payload);
      console.log("called");
      addToast(
        payload?.data?.status,
        payload?.notification?.title,
        payload?.notification?.body
      );
    });
    return () => {
      console.log("failed: ");
    };
  }, []);

  // Function to add a new toast
  const addToast = (variant, title, body) => {
    const newToast = {
      id: Math.random(),
      Component: BootstrapToast,
      variant: variant,
      title: title,
      body: body,
    };

    setToasts((prevState) => [...prevState, newToast]);
  };

  const removeToast = (id) => {
    setToasts((prevState) => prevState.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContainer className="position-fixed top-0 end-0 p-3">
      {toasts.map(({ id, Component, variant, title, body }) => (
        <Component
          key={id}
          variant={variant}
          title={title}
          body={body}
          handleRemove={() => removeToast(id)}
        />
      ))}
    </ToastContainer>
  );
};

export default ToastComponent;
