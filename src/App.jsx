import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MovieList from "./components/MovieList";
import "./index.css";

const App = () => {
  const [selectedGenre, setSelectedGenre] = useState("");

  return (
    <div className="bg-gray-900 min-h-screen text-white flex flex-col">
      <Navbar onSearch={setSelectedGenre} />
      <div className="container mx-auto flex-1 pt-24 pb-16 ">
        <MovieList genre={selectedGenre}  />
      </div>
      <Footer />
    </div>
  );
};

export default App;
