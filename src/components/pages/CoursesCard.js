import React from "react";
import { Link } from "react-router-dom";
import "./CourseCard.css";

function CoursesCard({ course }) {
  return (
    <div className="course-card">
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      <Link to={`/course/${course.id}`} className="course-card-link">
        View Details
      </Link>
    </div>
  );
}

export default CoursesCard;
