import React from "react";
import PropTypes from "prop-types";
import DetailPresenter from "./DetailPresenter";
import { moviesApi, tvApi } from "../../api";

export default class extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("title")
    };
  };

  constructor(props) {
    super(props);
    const {
      navigation: {
        state: {
          params: {
            isMovie,
            id,
            posterPhoto,
            backgroundPhoto,
            title,
            voteAvg,
            overview
          }
        }
      }
    } = props;
    this.state = {
      id,
      posterPhoto,
      backgroundPhoto,
      title,
      voteAvg,
      overview,
      loading: true,
      isMovie
    };
  }

  async componentDidMount() {
    const { isMovie, id } = this.state;
    let { error, genres, overview, status, date, backgroundPhoto } = this.state;
    try {
      if (isMovie) {
        ({
          data: { genres, status, release_date: date }
        } = await moviesApi.movieDetail(id));
      } else {
        ({
          data: {
            genres,
            status,
            ovreview,
            first_air_date: date,
            backdrop_path: backgroundPhoto
          }
        } = await tvApi.tvDetail(id));
      }
    } catch {
      error = "Sorry ";
    } finally {
      this.setState({
        loading: false,
        genres,
        backgroundPhoto,
        overview,
        status,
        date
      });
    }
  }

  render() {
    const {
      id,
      posterPhoto,
      backgroundPhoto,
      title,
      voteAvg,
      overview,
      loading,
      isMovie,
      date,
      status,
      genres,
      error
    } = this.state;
    return (
      <DetailPresenter
        id={id}
        posterPhoto={posterPhoto}
        backgroundPhoto={backgroundPhoto}
        title={title}
        voteAvg={voteAvg}
        overview={overview}
        loading={loading}
        isMovie={isMovie}
        date={date}
        status={status}
        genres={genres}
        error={error}
      />
    );
  }
}
