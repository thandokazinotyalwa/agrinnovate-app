import React from "react";
import "./styles.css";

const ModerationTools = ({ flags }) => {
  return (
    <div className="moderation-tools">
      {flags.map((flag, index) => (
        <div key={index} className="flag-card">
          <p>
            Flagged by {flag.reporter}: {flag.reason}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ModerationTools;
