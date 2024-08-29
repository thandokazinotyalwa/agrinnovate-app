import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Job.css";

// This should ideally come from a higher-level component or context
const opportunities = [
  {
    id: 1,
    lat: -33.9249,
    lng: 18.4241,
    title: "Farm Opportunity",
    type: "agriculture",
    city: "Cape Town",
    summary:
      "A great opportunity to work on a local farm and learn new skills.",
    description: "This is a detailed description of the farm opportunity...",
    requirements: "Applicants must have basic knowledge of farming.",
    applicationDeadline: "2024-09-17",
    contact: "brownjoe@gmail.com",
  },
  {
    id: 2,
    lat: -29.8587,
    lng: 31.0218,
    title: "Training Event",
    type: "event",
    city: "Durban",
    summary:
      "Join us for a comprehensive training session on sustainable farming practices.",
    description: "This training event will cover topics such as...",
    requirements: "Open to all interested in sustainable farming.",
    applicationDeadline: "2024-10-15",
    contact: "thandonotyalwa@gmail.com",
  },
  {
    id: 3,
    lat: -26.2041,
    lng: 28.0473,
    title: "Agriculture Fair",
    type: "agriculture",
    city: "Johannesburg",
    summary: "Explore the latest trends in agriculture at this year's fair.",
    description: "This is a detailed description of the farm opportunity...",
    requirements: "Applicants must have basic knowledge of farming.",
    applicationDeadline: "2024-10-30",
    contact: "nzwakimgxaji@gmail.com",
  },
  {
    id: 4,
    lat: -25.746,
    lng: 28.188,
    title: "Workshop on Sustainable Farming",
    type: "event",
    city: "Pretoria",
    summary:
      "Participate in a hands-on workshop focused on sustainable farming techniques.",
    description: "This is a detailed description of the farm opportunity...",
    requirements: "Applicants must have basic knowledge of farming.",
    applicationDeadline: "2024-09-30",
    contact: "mbalinyathi@gmail.com",
  },
];

const Job = () => {
  const { id } = useParams();

  // Find the selected opportunity based on ID
  const opportunity = opportunities.find((op) => op.id === parseInt(id, 10));

  if (!opportunity) {
    return (
      <div>
        <h2>No opportunity found.</h2>
        <Link to="/opportunities" className="btn btn-success">
          Back to Services
        </Link>
      </div>
    );
  }

  return (
    <div className="job-container">
      <div className="card-job">
        <div className="card-body">
          <h5 className="card-title">{opportunity.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{opportunity.city}</h6>
          <p className="card-text">{opportunity.summary}</p>
          <p className="card-text">{opportunity.description}</p>
          <p className="card-text">{opportunity.requirements}</p>
          <p className="card-text">{opportunity.applicationDeadline}</p>
          <p className="card-text">{opportunity.contact}</p>
          <Link to="/opportunities" className="btn btn-success">
            Back to Services
          </Link>
        </div>
      </div>

      {/* Comments Section */}
      <CommentSection />
    </div>
  );
};

const CommentSection = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    try {
      const response = await axios.get("fetch_comments.php");
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleLike = async (commentId) => {
    try {
      await axios.post("like_dislike.php", `action=like&id=${commentId}`);
      loadComments();
    } catch (error) {
      console.error("Error liking comment:", error);
    }
  };

  const handleDislike = async (commentId) => {
    try {
      await axios.post("like_dislike.php", `action=dislike&id=${commentId}`);
      loadComments();
    } catch (error) {
      console.error("Error disliking comment:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle comment submission here
  };

  return (
    <div className="comment-container">
      <h1>Comments</h1>
      <div id="comments-section">
        {comments.map((comment) => (
          <div className="comment-box" key={comment.id}>
            <div className="comment-header">
              <span className="comment-username">{comment.username}</span>
              <span className="comment-date">{comment.date}</span>
            </div>
            <div className="comment-content">{comment.content}</div>
            <div className="comment-actions">
              <button
                className="like-btn"
                onClick={() => handleLike(comment.id)}
              >
                <i className="fas fa-thumbs-up"></i> Liked ({comment.likes})
              </button>
              <button
                className="dislike-btn"
                onClick={() => handleDislike(comment.id)}
              >
                <i className="fas fa-thumbs-down"></i> Disliked (
                {comment.dislikes})
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="row mb-5">
        <div className="col mb-3">
          <form onSubmit={handleSubmit}>
            <div className="mb-3 form-check">
              <p>
                <label htmlFor="w3review">Submit your comments online:</label>
              </p>
              <textarea
                id="w3review"
                name="w3review"
                rows="4"
                cols="50"
                placeholder="Add a comment"
                required
              ></textarea>
              <br />
              <input
                type="submit"
                value="Submit"
                className="btn btn-branding"
              />
            </div>
          </form>
        </div>
        <div className="col social-links">
          <p>You can share on the platforms below:</p>
          <a
            href="mailto:open.innovation@capetown.gov.za"
            target="_blank"
            rel="noreferrer"
            title="Email Profile"
          >
            <i className="fa-solid fa-envelope"></i>
          </a>
          <a
            href="https://www.capetown.gov.za/linkedin"
            target="_blank"
            rel="noreferrer"
            title="LinkedIn Profile"
          >
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a
            href="https://www.facebook.com/CityofCT/"
            target="_blank"
            rel="noreferrer"
            title="Facebook Profile"
          >
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a
            href="https://twitter.com/CityofCT"
            target="_blank"
            rel="noreferrer"
            title="Twitter Profile"
          >
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a
            href="https://www.instagram.com/cityofct"
            target="_blank"
            rel="noreferrer"
            title="Instagram Profile"
          >
            <i className="fa-brands fa-instagram"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Job;
