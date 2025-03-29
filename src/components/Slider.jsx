import React, { useState, useEffect } from "react";

const Slider = () => {
  const [movies, setMovies] = useState([]);
  const API = "fef1406a";

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      const url = `https://www.omdbapi.com/?s=naruto&apikey=${API}`;
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.Search || []);
    };
    fetchTrendingMovies();
  }, [API]);

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      <div className="flex transition-transform duration-700 ease-in-out">
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            className="min-w-full h-full bg-cover bg-center relative"
            style={{ backgroundImage: `url(${movie.Poster})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black"></div>
            <div className="absolute bottom-0 left-0 p-10 text-white">
              <h2 className="text-4xl font-bold">{movie.Title}</h2>
              <p className="text-gray-300">{movie.Year}</p>
              <button className="mt-4 px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-500">
                Watch Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
