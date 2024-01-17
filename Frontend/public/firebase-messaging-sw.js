importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

//the Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyBt63DIxPMz4n6nfsOdpRrXtmmqCn-wRMo",
  authDomain: "serverless-project-392613.firebaseapp.com",
  projectId: "serverless-project-392613",
  storageBucket: "serverless-project-392613.appspot.com",
  messagingSenderId: "314563028311",
  appId: "1:314563028311:web:2b116fdeb399b225c94a12",
  measurementId: "G-G4CLCFMNHW",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  // self.registration.showNotification(notificationTitle, notificationOptions);
});
