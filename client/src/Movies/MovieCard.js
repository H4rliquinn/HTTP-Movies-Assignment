import React from "react";
import { withRouter } from "react-router";

const NoMovieCard = props => {
  const { title, director, metascore, stars, id } = props.movie;
  return (
    <div className="movie-card">
      <div className="head">
        <h2>{title}</h2>
      </div>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
    </div>
  );
};
const MovieCard = withRouter(NoMovieCard);
export default MovieCard;
