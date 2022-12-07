import React, { useEffect, useState } from "react";
import "./App.css";
import MovieContent from "./MovieContent";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav } from "react-bootstrap";

const API_URL_popular =
  "https://api.themoviedb.org/3/movie/popular?api_key=8346c0e0537ba845dea03612f4d2c866";
const API_URL_upcoming =
  "https://api.themoviedb.org/3/movie/upcoming?api_key=8346c0e0537ba845dea03612f4d2c866";

function App() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  //Hämtar filmer från API
  useEffect(() => {
    fetch(API_URL_popular)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPopularMovies(data.results);
      });

    fetch(API_URL_upcoming)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUpcomingMovies(data.results);
      });
  }, []);

  return (
    <>
      <Navbar bg="black" expand="lg" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/home">TMDB Movie App</Navbar.Brand>
          <Navbar.Brand href="/home">IMDB</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll"></Navbar.Toggle>
          <Navbar.Collapse id="navbarScroll">
            <Nav
              // className="me-auto my-2 my-lg-3"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <h2>Popular Movies</h2>
      <div className="list-container">
        {popularMovies.map((movieRequest) => (
          <MovieContent key={movieRequest.id} {...movieRequest} />
        ))}
      </div>
      <h2>Upcoming Movies</h2>
      <div className="list-container">
        {upcomingMovies.map((movieRequest) => (
          <MovieContent key={movieRequest.id} {...movieRequest} />
        ))}
      </div>
    </>
  );
}

export default App;
