import React from "react";
import { useParams } from "react-router-dom";
import "./CourseDetailPage.css";

const courses = [
  {
    id: 1,
    title: "Introduction to Agriculture",
    description: "Learn the basics of agriculture.",
    details: "Detailed information about Introduction to Agriculture.",
  },
  {
    id: 2,
    title: "Sustainable Farming Practices",
    description: "Explore sustainable farming methods.",
    details: "Detailed information about Sustainable Farming Practices.",
  },
  {
    id: 3,
    title: "Advanced Crop Management",
    description: "Advanced techniques for crop management.",
    details: "Detailed information about Advanced Crop Management.",
  },
  // Add more courses as needed
];

function CourseDetailPage() {
  const { id } = useParams();
  const course = courses.find((c) => c.id === parseInt(id));

  if (!course) {
    return <div>Course not found.</div>;
  }

  return (
    <div className="course-detail">
      <h1>{course.title}</h1>
      <p>{course.details}</p>
    </div>
  );
}

export default CourseDetailPage;
