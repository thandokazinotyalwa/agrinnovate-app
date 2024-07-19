import React from "react";
import HeroSection from "../HeroSection";
import About from "./About";
import Cards from "../Cards";
import Footer from "../Footer";
import "../../App.css";

function Home() {
  return (
    <>
      <HeroSection />
      <About />
      <Cards />
      <Footer />
    </>
  );
}

export default Home;
