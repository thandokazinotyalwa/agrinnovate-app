import React from "react";
import "./DataAnalytics.css";

function DataAnalytics() {
  // Example data
  const progress = {
    completed: 75,
    inProgress: 20,
    notStarted: 5,
  };

  return (
    <div className="data-analytics">
      <h2>Course Progress</h2>
      <div className="progress-bar">
        <div className="completed" style={{ width: `${progress.completed}%` }}>
          Completed: {progress.completed}%
        </div>
        <div
          className="in-progress"
          style={{ width: `${progress.inProgress}%` }}
        >
          In Progress: {progress.inProgress}%
        </div>
        <div
          className="not-started"
          style={{ width: `${progress.notStarted}%` }}
        >
          Not Started: {progress.notStarted}%
        </div>
      </div>
    </div>
  );
}

export default DataAnalytics;
