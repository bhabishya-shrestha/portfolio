import React from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";

const App = () => {
  return (
    <main className="max-w-7xl w-full mx-auto relative">
      <Navbar />
      <Hero />
      <About />
    </main>
  );
};

export default App;
