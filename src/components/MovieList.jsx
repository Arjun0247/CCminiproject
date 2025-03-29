import React, { useState } from "react";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const API = "fef1406a";

  // const genres = [
  //   { value: "", label: "All" },
  //   { value: "Action", label: "Action" },
  //   { value: "Comedy", label: "Comedy" },
  //   { value: "Drama", label: "Drama" },
  //   { value: "Horror", label: "Horror" },
  //   { value: "Romance", label: "Romance" },
  //   { value: "Thriller", label: "Thriller" },
  //   { value: "Western", label: "Western" },
  // ];

  const fetchMovies = async () => {
    setLoading(true);

    let url = `https://www.omdbapi.com/?apikey=${API}`;
    
    if (searchQuery) {
      url += `&s=${searchQuery}`;
    } else if (genre) {
      url += `&s=${genre}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.Search || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-10 min-h-screen">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 border border-amber-500">
        <h2 className="text-2xl font-bold text-amber-500 mb-4">Discover Movies</h2>
        
        {/* Search bar & genre selection */}
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">

          {/* Search bar */}
          <input
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 w-full md:w-1/2"
          />

          {/* Genre Dropdown
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 w-full md:w-1/3"
          >
            {genres.map((g) => (
              <option key={g.value} value={g.value}>
                {g.label}
              </option>
            ))}
          </select> */}

          {/* Search Button */}
          <button
            onClick={fetchMovies}
            className="bg-amber-600 hover:bg-amber-500 text-white px-6 py-3 rounded-lg font-medium transition duration-300 ease-in-out w-full md:w-auto"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Searching...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                Search
              </span>
            )}
          </button>
        </div>
      </div>

      {movies.length > 0 && (
        <h3 className="text-2xl font-bold text-amber-500 mb-6">
          Results for: <span className="text-white">{searchQuery || genre}</span>
        </h3>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700 hover:border-amber-500 transition duration-300 transform hover:-translate-y-1"
          >
            <div className="relative h-96 overflow-hidden">
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "/api/placeholder/300/450"}
                alt={movie.Title}
                className="w-full h-full object-cover transition duration-500 hover:scale-110"
              />
              <div className="absolute top-0 right-0 bg-amber-600 text-white px-2 py-1 m-2 rounded">
                {movie.Year}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold text-amber-500 mb-2 truncate">{movie.Title}</h3>
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-400 text-sm">IMDb: {movie.imdbID}</span>
                <button className="bg-gray-700 hover:bg-gray-600 text-amber-500 px-3 py-1 rounded text-sm font-medium transition">
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center items-center mt-10">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-amber-500"></div>
        </div>
      )}

      {!loading && movies.length === 0 && (searchQuery || genre) && (
        <div className="bg-gray-800 text-center p-10 rounded-lg mt-6 border border-gray-700">
          <svg className="w-16 h-16 text-amber-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3 className="text-xl text-white font-bold mb-2">No movies found</h3>
          <p className="text-gray-400">Try searching for a different title or genre</p>
        </div>
      )}
    </div>
  );
};

export default MovieList;
