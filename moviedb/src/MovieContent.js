import { Modal, Button } from "react-bootstrap";
import React, { useState } from "react";
const API_IMG = "https://image.tmdb.org/t/p/w500/";

const MovieContent = (props) => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    if (props.handleViewed) {
      props.handleViewed(props.movie.id);
    }
    setShow(true);
  };
  const handleClose = () => setShow(false);

  return (
    <>
      <div className="movie-card text-center mb-3" onClick={handleShow}>
        <div className="card-body">
          <img
            className="card-img-top"
            style={{ width: "10rem" }}
            src={API_IMG + props.movie.poster_path}
            alt="movie posters"
          />
          <div className="card-body">
            <p>Rating: {props.movie.vote_average}</p>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            className="card-img-top"
            src={API_IMG + props.movie.poster_path}
            alt="Movie posters"
          />
          <h3>{props.movie.title}</h3>
          <h4>Rating: {props.movie.vote_average}</h4>
          <h5>Realease Date: {props.movie.release_date}</h5>
          <br></br>
          <h6>Overview</h6>
          <p className="modal-p">{props.movie.overview}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="modal-button"
            variant="secondary"
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MovieContent;
