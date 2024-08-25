import React from "react";
import "./styles.css";

const ContentOrganization = () => {
  return (
    <div className="content-organization">
      <div className="pinned-posts">
        <h4>Pinned Posts</h4>
        {/* Display pinned posts here */}
      </div>
      <div className="tags">
        <h4>Tags</h4>
        {/* Display tags here */}
      </div>
      <div className="thread-sorting">
        <h4>Sort Threads</h4>
        {/* Sorting options */}
      </div>
    </div>
  );
};

export default ContentOrganization;
