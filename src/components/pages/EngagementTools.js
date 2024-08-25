import React from "react";
import "./styles.css";

const EngagementTools = () => {
  return (
    <div className="engagement-tools">
      <button>Like</button>
      <button>Upvote</button>
      <button>Downvote</button>
      <div className="badges">
        <p>Badges and Achievements</p>
        {/* Display badges here */}
      </div>
      <div className="polls">
        <p>Polls and Surveys</p>
        {/* Display polls here */}
      </div>
    </div>
  );
};

export default EngagementTools;
