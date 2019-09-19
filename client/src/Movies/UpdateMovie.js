import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
    console.log("STATE", this.state);
  }

  componentDidUpdate(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
    console.log("STATE-UP", this.state);
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${this.props.match.params.id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };
  handleChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };
  handleArrayChange = e => {
    const newArray = this.state.movie.stars;
    newArray[e.target.name] = e.target.value;
    this.setState({
      ...this.state,
      stars: newArray
    });
  };

  edit = e => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:5000/api/movies/${this.state.movie.id}`,
        this.state.movie
      )
      .then(res => {
        console.log(res.data);
        //     props.updateItems(res.data);
        //     props.history.push(`/item-list/${item.id}`);
      })
      .catch(err => console.log(err.response));
  };
  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }
    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div>
          <form onSubmit={this.edit}>
            <input type="hidden" name="id" value={this.state.movie.id} />
            <input
              type="text"
              name="title"
              value={this.state.movie.title}
              onChange={this.handleChange}
              placeholder="title"
            />
            <input
              type="text"
              name="director"
              value={this.state.movie.director}
              onChange={this.handleChange}
              placeholder="director"
            />
            <input
              type="text"
              name="metascore"
              value={this.state.movie.metascore}
              onChange={this.handleChange}
              placeholder="metascore"
            />
            {this.state.movie.stars.map((item, x) => {
              return (
                <input
                  type="text"
                  key={x}
                  name={x}
                  value={item}
                  onChange={this.handleArrayChange}
                  placeholder="Name of Star"
                />
              );
            })}
            <div className="updateButton">
              <button type="submit">Update Movie</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
