import React, { useState } from 'react';
import './Learn.css';

const courses = [
  { id: 1, category: 'agricultural', title: 'Introduction to Farming', videoUrl: '/video/intro-to-farming.mp4', description: 'Basics of farming.' },
  { id: 2, category: 'agricultural', title: 'Advanced Crop Management', videoUrl: '/video/advanced crop management.mp4', description: 'Techniques for managing crops.' },
  { id: 3, category: 'agricultural', title: 'Sustainable Agriculture', videoUrl: '/video/sustainable agriculture.mp4', description: 'Practices for sustainable farming.' },
  { id: 4, category: 'agricultural', title: 'Soil Health and Management', videoUrl: '/video/soil health.mp4', description: 'How to maintain healthy soil.' },
  { id: 5, category: 'agricultural', title: 'Water Conservation in Agriculture', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', description: 'Techniques for conserving water.' },
  { id: 6, category: 'agricultural', title: 'Integrated Pest Management', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', description: 'Strategies for managing pests.' },
  { id: 7, category: 'business', title: 'Introduction to Agricultural Business', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', description: 'Basics of agricultural business.' },
  { id: 8, category: 'business', title: 'Marketing Strategies for Farmers', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', description: 'Effective marketing strategies.' },
  { id: 9, category: 'business', title: 'Financial Management for Farms', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', description: 'Managing farm finances.' },
  { id: 10, category: 'business', title: 'Supply Chain Management in Agriculture', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', description: 'Optimizing supply chains.' },
  // Add more courses as needed
];

const Learn = () => {
  const [selectedCategory, setSelectedCategory] = useState('agricultural');
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [completedCourses, setCompletedCourses] = useState(new Set());

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
  };

  const handleComplete = (courseId) => {
    setCompletedCourses(prev => new Set(prev).add(courseId));
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const newSelectedCourse = courses.find(course => course.category === category);
    setSelectedCourse(newSelectedCourse);
  };

  const filteredCourses = courses.filter(course => course.category === selectedCategory);

  return (
    <div className="learn-page">
      <h1 className="page-heading">Welcome to AgriCademy</h1>
      <div className="learn-container">
        <div className="sidebar">
          <h2>Topics</h2>
          <div className="category-buttons">
            <button className={selectedCategory === 'agricultural' ? 'active' : ''} onClick={() => handleCategoryChange('agricultural')}>Agricultural</button>
            <button className={selectedCategory === 'business' ? 'active' : ''} onClick={() => handleCategoryChange('business')}>Business</button>
          </div>
          <ul>
            {filteredCourses.map(course => (
              <li key={course.id} className={completedCourses.has(course.id) ? 'completed' : ''}>
                <button onClick={() => handleCourseSelect(course)}>{course.title}</button>
                {completedCourses.has(course.id) && <span className="checkmark">✔</span>}
              </li>
            ))}
          </ul>
        </div>
        <div className="content">
          <h1 className="course-title">{selectedCourse.title}</h1>
          <div className="video-container">
            <video controls src={selectedCourse.videoUrl} className="course-video">
              Your browser does not support the video tag.
            </video>
          </div>
          <p>{selectedCourse.description}</p>
          <button onClick={() => handleComplete(selectedCourse.id)} className="complete-button">
            Mark as Complete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Learn;
