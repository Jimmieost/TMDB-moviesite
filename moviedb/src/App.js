import React, { useEffect, useState } from "react";
import "./App.css";
import MovieContent from "./MovieContent";

const API_URL_popular =
  "https://api.themoviedb.org/3/movie/popular?api_key=8346c0e0537ba845dea03612f4d2c866";

function App() {
  const [popularMovies, setPopularMovies] = useState([]);

  //Hämtar filmer från API:t
  useEffect(() => {
    fetch(API_URL_popular)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPopularMovies(data.results);
      });
  }, []);

  return (
    <div>
      {popularMovies.map((movieRequest) => (
        <MovieContent key={movieRequest.id} {...movieRequest} />
      ))}
    </div>
  );
}

export default App;
