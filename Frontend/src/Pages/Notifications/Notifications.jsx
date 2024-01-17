import React, { useEffect } from "react";
import $ from "jquery"; // Make sure to include jQuery in your project

const NotificationsComponent = () => {
  useEffect(() => {
    try {
      const data = {
        userId: localStorage.getItem("userId"),
      };
      fetch(
        `${process.env.REACT_APP_BASE_URL}/notifications/getNotifications`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(data),
        }
      )
        .then((res) => res.json())
        .then((result) => {
          // Handle the response from the API
          console.log(result); // Do something with the response
          if (!result.status) {
          } else {
            const payload = result.data;
            payload.forEach((notif) => {
              const cssClass =
                notif.notificationType === "reminder"
                  ? "reminders"
                  : "notifications";
              const dateStr = new Date(notif.createdAt).toLocaleString();
              const status = notif.status.toLowerCase();
              //   let alertstatus = status;
              //   if (status === "reminder") {
              //     alertstatus = "warning";
              //   }
              $(`.${cssClass}`).append(`
                    <div class="alert alert-${status}" role="alert">
                      <div class="alert-heading row">
                        <h5 class="col">
                          <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Info:" style="height:16px; width:16px"><use xlink:href="#${notif.status}"/></svg>
                          ${notif.title}
                        </h5>
                        <div class="col">
                          <p class="ms-auto" style="width: fit-content">${dateStr}</p>
                        </div>
                      </div>
                      <hr class="mt-0">
                      <p class="mb-0">${notif.body}</p>
                    </div>
                  `);
            });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (err) {
      console.log("errorrrrrrrr: ", err);
    }
  }, []);

  return (
    <div>
      <div id="contentDiv" className="row m-0 rounded-1">
        <div className="notifications_div col-12 col-md-6 py-4 border-0 border-md-end">
          <div className="h2 text-center px-2 px-md-5">
            Notifications
            <hr />
          </div>
          <div
            className="dataDiv notifications px-2 px-md-5 pt-2"
            style={{ overflow: "auto" }}
          ></div>
        </div>
        <div className="reminders_div col-12 col-md-6 pt-0 pt-md-4 py-4">
          <div className="h2 text-center px-2 px-md-5">
            Reminders
            <hr />
          </div>
          <div
            className="dataDiv reminders px-2 px-md-5 pt-2"
            style={{ overflow: "auto" }}
          ></div>
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
        <symbol id="Success" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
        </symbol>
        <symbol id="Warning" viewBox="0 0 16 16">
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
        </symbol>
        <symbol id="Danger" viewBox="0 0 16 16">
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </symbol>

        <svg id="Info" className="bi bi-alarm" viewBox="0 0 16 16">
          <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5z" />
          <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1h-3zm1.038 3.018a6.093 6.093 0 0 1 .924 0 6 6 0 1 1-.924 0zM0 3.5c0 .753.333 1.429.86 1.887A8.035 8.035 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5zM13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1z" />
        </svg>
      </svg>
    </div>
  );
};

export default NotificationsComponent;
