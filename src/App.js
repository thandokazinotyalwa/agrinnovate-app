import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./components/pages/Home";
import Services from "./components/pages/Services";
import About from "./components/pages/About";
import Learn from "./components/pages/Learn";
import SignUp from "./components/pages/SignUp";
import LogIn from "./components/pages/LogIn";
import ChatRoom from "./components/pages/ChatRoom";
import Courses from "./components/pages/Courses";
import CourseDetailPage from "./components/pages/CourseDetailPage";
import GeospatialData from "./components/pages/GeospatialData";
import Funding from "./components/pages/Funding";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/opportunities" element={<Services />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/chat" element={<ChatRoom />} />
          <Route path="/agriculture-course" element={<Courses />} />
          <Route path="/course/:id" element={<CourseDetailPage />} />
          {<Route path="/geospatial-data" element={<GeospatialData />} />}
          {<Route path="/funding" element={<Funding />} />}
        </Routes>
      </Router>
    </>
  );
}

export default App;
