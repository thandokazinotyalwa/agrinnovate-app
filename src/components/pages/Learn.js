import React, { useState } from 'react';
import './Learn.css';

const courses = [
  { id: 1, title: 'Introduction to Farming', videoUrl: 'https://www.example.com/video1.mp4', description: 'Basics of farming.' },
  { id: 2, title: 'Advanced Crop Management', videoUrl: 'https://www.example.com/video2.mp4', description: 'Techniques for managing crops.' },
  // Add more courses as needed
];

const Learn = () => {
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [completedCourses, setCompletedCourses] = useState(new Set());

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
  };

  const handleComplete = (courseId) => {
    setCompletedCourses(prev => new Set(prev).add(courseId));
  };

  return (
    <div className="learn-container">
      <div className="sidebar">
        <h2>Topics</h2>
        <ul>
          {courses.map(course => (
            <li key={course.id} className={completedCourses.has(course.id) ? 'completed' : ''}>
              <button onClick={() => handleCourseSelect(course)}>{course.title}</button>
              {completedCourses.has(course.id) && <span className="checkmark">✔</span>}
            </li>
          ))}
        </ul>
      </div>
      <div className="content">
        <h1>{selectedCourse.title}</h1>
        <video controls src={selectedCourse.videoUrl} className="course-video">
          Your browser does not support the video tag.
        </video>
        <p>{selectedCourse.description}</p>
        <button onClick={() => handleComplete(selectedCourse.id)} className="complete-button">
          Mark as Completed
        </button>
      </div>
    </div>
  );
};

export default Learn;
