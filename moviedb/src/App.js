import React, { useEffect, useState } from "react";
import "./App.css";
import MovieContent from "./MovieContent";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import logo from "./tmdblogo400x400.jpg";
import MovieCarousel from "./MovieCarousel";

const API_URL_popular =
  "https://api.themoviedb.org/3/movie/popular?api_key=8346c0e0537ba845dea03612f4d2c866";
const API_URL_upcoming =
  "https://api.themoviedb.org/3/movie/upcoming?api_key=8346c0e0537ba845dea03612f4d2c866";

function App() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  const [query, setQuery] = useState("");

  //Hämtar filmer från API
  useEffect(() => {
    fetch(API_URL_popular)
      .then((response) => response.json())
      .then((data) => {
        setPopularMovies(data.results);
      });

    fetch(API_URL_upcoming)
      .then((response) => response.json())
      .then((data) => {
        setUpcomingMovies(data.results);
      });
  }, []);

  const searchMovie = async (e) => {
    e.preventDefault();

    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=8346c0e0537ba845dea03612f4d2c866&query=${query}`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setPopularMovies(data.results);
    } catch (e) {}
  };

  const addRecentlyViewedFromPopular = (id) => {
    if (!recentlyViewed.some((x) => x.id === id)) {
      var recentlyViewedMovie = popularMovies.find((x) => x.id === id);
      if (recentlyViewed.length >= 5) {
        const movies = [...recentlyViewed, recentlyViewedMovie];
        setRecentlyViewed(movies.slice(1, 6));
      } else {
        setRecentlyViewed((currentArray) => [
          ...currentArray,
          recentlyViewedMovie,
        ]);
      }
    }
  };

  const addRecentlyViewedFromUpcoming = (id) => {
    if (!recentlyViewed.some((x) => x.id === id)) {
      var recentlyViewedMovie = upcomingMovies.find((x) => x.id === id);
      if (recentlyViewed.length >= 5) {
        const movies = [...recentlyViewed, recentlyViewedMovie];
        setRecentlyViewed(movies.slice(1, 6));
      } else {
        setRecentlyViewed((currentArray) => [
          ...currentArray,
          recentlyViewedMovie,
        ]);
      }
    }
  };

  const changeHandler = (e) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <Navbar bg="black" expand="lg" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/home">
            <img src={logo} alt="tmdb logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll"></Navbar.Toggle>
          <div>
            <Navbar.Collapse id="navbarScroll">
              <Nav style={{ maxHeight: "100px" }} navbarScroll></Nav>

              <Form className="d-flex" onSubmit={searchMovie}>
                <FormControl
                  type="search"
                  placeholder="Search TMDB"
                  className="me-2"
                  aria-label="search"
                  name="query"
                  value={query}
                  onChange={changeHandler}
                ></FormControl>
                <Button
                  className="search-button"
                  variant="secondary"
                  type="submit"
                >
                  Search
                </Button>
              </Form>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
      {popularMovies.length > 0 ? (
        <MovieCarousel movies={popularMovies} />
      ) : null}

      <h2>Popular Movies</h2>
      <div className="list-container">
        {popularMovies.map((movieRequest) => (
          <MovieContent
            key={movieRequest.id}
            movie={movieRequest}
            handleViewed={addRecentlyViewedFromPopular}
          />
        ))}
      </div>
      <h2>Upcoming Movies</h2>
      <div className="list-container">
        {upcomingMovies.map((movieRequest) => (
          <MovieContent
            key={movieRequest.id}
            movie={movieRequest}
            handleViewed={addRecentlyViewedFromUpcoming}
          />
        ))}
      </div>
      <h2>Recently Viewed Movies</h2>
      <div className="list-container">
        {recentlyViewed.map((movieRequest) => (
          <MovieContent key={movieRequest.id} movie={movieRequest} />
        ))}
      </div>
    </>
  );
}
export default App;
