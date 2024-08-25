import React from "react";
import "./styles.css";

const UserProfile = ({ profiles }) => {
  return (
    <div className="user-profile">
      {profiles.map((profile, index) => (
        <div key={index} className="profile-card">
          <img src={profile.avatar} alt={`${profile.name}'s avatar`} />
          <h3>{profile.name}</h3>
          <p>{profile.bio}</p>
        </div>
      ))}
    </div>
  );
};

export default UserProfile;
