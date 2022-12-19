import Carousel from "react-bootstrap/Carousel";
const API_IMG = "https://image.tmdb.org/t/p/original/";

function MovieCarousel(props) {
  return (
    <Carousel>
      {props.movies.map((movie) => (
        <Carousel.Item key={movie.id}>
          <img
            className="carousel-image d-block mh-25 w-100"
            src={API_IMG + movie.backdrop_path}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>{movie.title}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default MovieCarousel;
