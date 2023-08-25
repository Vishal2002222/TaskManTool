import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Explore from './components/Explore'; // Import the Explore component
import Suggestions from './components/Suggestions'; // Import the Explore component
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} /> {/* Define the Explore route */}
        <Route path="/suggestions" element={<Suggestions />} /> {/* Define the Explore route */}
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
