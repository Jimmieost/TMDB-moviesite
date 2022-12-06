import React from "react";
const API_IMG = "https://image.tmdb.org/t/p/w500/";

//Lägger ut filmernas innehåll på sidan
const MovieContent = ({
  title,
  poster_path,
  vote_average,
  release_date,
  overview,
}) => {
  return (
    <div>
      <h1>{title}</h1>
      <img src={API_IMG + poster_path} alt="Movie Poster"></img>
      <p>{overview}</p>
    </div>
  );
};

export default MovieContent;
