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

const API_URL_popular =
  "https://api.themoviedb.org/3/movie/popular?api_key=8346c0e0537ba845dea03612f4d2c866";
const API_URL_upcoming =
  "https://api.themoviedb.org/3/movie/upcoming?api_key=8346c0e0537ba845dea03612f4d2c866";
const API_SEARCH =
  "https://api.themoviedb.org/3/search/movie?api_key=8346c0e0537ba845dea03612f4d2c866&query";

function App() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  // const [recentlyViewed, setRecentlyViewed] = useState([]);

  const [query, setQuery] = useState("");

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

  const searchMovie = async (e) => {
    e.preventDefault();
    console.log("Searching");
    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=8346c0e0537ba845dea03612f4d2c866&query=${query}`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setPopularMovies(data.results);
    } catch (e) {
      console.log(e);
    }
  };

  const changeHandler = (e) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <Navbar expand="lg" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/home">TMDB Movie App</Navbar.Brand>
          <Navbar.Brand href="/home">IMDB</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll"></Navbar.Toggle>
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
          <MovieContent
            key={movieRequest.id}
            {...movieRequest}
            // onShow={this.onShow}
          />
        ))}
      </div>
    </>
  );
}

export default App;

// class First extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: [{name: 'bob'}, {name: 'chris'}],
//     };
//   }

//   render() {
//     return (
//       <ul>
//         {this.state.data.map(d => <li key={d.name}>{d.name}</li>)}
//       </ul>
//     );
//   }
// }
