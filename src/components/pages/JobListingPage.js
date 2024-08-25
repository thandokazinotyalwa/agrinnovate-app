import React, { useState } from "react";
import "./JobListingPage.css";

const JobListingPage = () => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Frontend Developer",
      company: "Tech Solutions",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$90,000 - $120,000",
      postingDate: "2024-08-20",
      deadline: "2024-09-15",
      description:
        "We are looking for a Frontend Developer to join our team...",
      qualifications: "3+ years of experience with React...",
      benefits: "Health insurance, 401(k)...",
      companyOverview: "Tech Solutions is a leading software company...",
      contactInfo: "email@example.com",
    },
    // Add more job listings here
  ]);

  const [selectedJob, setSelectedJob] = useState(null);

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  const closeModal = () => {
    setSelectedJob(null);
  };

  return (
    <div className="job-listing-page">
      <NavigationBar />
      <div className="content">
        <SearchBar />
        <JobListings jobs={jobs} onJobClick={handleJobClick} />
        {selectedJob && (
          <JobDetailsModal job={selectedJob} onClose={closeModal} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default JobListingPage;
