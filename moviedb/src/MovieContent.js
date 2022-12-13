import { Modal, show, Button } from "react-bootstrap";
import React, { useState } from "react";
const API_IMG = "https://image.tmdb.org/t/p/w500/";

//Lägger ut filmernas innehåll på sidan
const MovieContent = ({
  title,
  poster_path,
  vote_average,
  release_date,
  overview,
}) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div className="movie-card card text-center mb-3">
      <div className="card-body">
        <img
          className="card-img-top"
          style={{ width: "10rem" }}
          src={API_IMG + poster_path}
        />
        <div className="card-body">
          <p>Rating: {vote_average}</p>
          <br />
          <button type="button" className="card-button" onClick={handleShow}>
            {title}
          </button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img className="card-img-top" src={API_IMG + poster_path} />
              <h3>{title}</h3>
              <h4>Rating: {vote_average}</h4>
              <h5>Realease Date: {release_date}</h5>
              <br></br>
              <h6>Overview</h6>
              <p>{overview}</p>
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
        </div>
      </div>
    </div>
  );
};

export default MovieContent;
