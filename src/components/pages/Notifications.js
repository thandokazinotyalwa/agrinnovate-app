import React from "react";
import "./styles.css";

const Notifications = ({ notifications }) => {
  return (
    <div className="notifications">
      {notifications.map((notification, index) => (
        <div key={index} className="notification-card">
          <p>{notification.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
