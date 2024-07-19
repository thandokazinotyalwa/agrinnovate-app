import React, { useState } from "react";
import SearchBar from "./SearchBar";
import DataAnalytics from "./DataAnalytics";
import CourseCard from "./CoursesCard";
import "./Courses.css";

const courses = [
  {
    id: 1,
    title: "Introduction to Agriculture",
    description: "Learn the basics of agriculture.",
  },
  {
    id: 2,
    title: "Sustainable Farming Practices",
    description: "Explore sustainable farming methods.",
  },
  {
    id: 3,
    title: "Advanced Crop Management",
    description: "Advanced techniques for crop management.",
  },
  // Add more courses as needed
];

function Courses() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="course-page">
      <h1>Agriculture Courses</h1>
      <SearchBar value={searchTerm} onChange={handleSearchChange} />
      <div className="course-list">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
      <DataAnalytics />
    </div>
  );
}

export default Courses;
