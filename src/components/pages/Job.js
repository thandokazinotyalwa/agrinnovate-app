import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Job.css";

// This should ideally come from a higher level component or context
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
    contact: "For more information contact: mbalinyathi@gmail.com",
  },
];

const Job = () => {
  const { id } = useParams();

  // Find the selected opportunity based on ID
  const opportunity = opportunities.find((op) => op.id === parseInt(id, 10));

  if (!opportunity) {
    return (
      <div>
        Farm Opportunity - Cape Town A great opportunity to work on a local farm
        and learn new skills. Training Event - Durban Join us for a
        comprehensive training session on sustainable farming practices.
        Agriculture Fair - Johannesburg Explore the latest trends in agriculture
        at this year's fair. Workshop on Sustainable Farming - Pretoria
        Participate in a hands-on workshop focused on sustainable farming
        techniques.
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
    </div>
  );
};

export default Job;
