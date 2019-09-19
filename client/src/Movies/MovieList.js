import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = props.movies;
  }

  componentDidMount() {
    // console.log(this.props);
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => this.props.setMovies({ movies: res.data }))
      .catch(err => console.log(err.response));
  }

  componentDidUpdate(prevProps) {
    console.log("UPDATE", this.props);
    console.log("TEST", this.props.movies, prevProps.movies);
    if (this.props.Movies !== prevProps.Movies) {
      axios
        .get("http://localhost:5000/api/movies")
        .then(res => {
          this.props.setMovies({ movies: res.data });
        })
        .catch(err => console.log(err.response));
    }
  }

  render() {
    return (
      <div className="movie-list">
        {this.props.movies.movies.map(movie => (
          <MovieDetails key={movie.id} movie={movie} />
        ))}
      </div>
    );
  }
}

function MovieDetails({ movie }) {
  return (
    <Link to={`/movies/${movie.id}`}>
      <MovieCard movie={movie} />
    </Link>
  );
}
