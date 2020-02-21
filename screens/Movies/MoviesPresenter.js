import React from "react";
import PropTypes from "prop-types";
import Loader from "../../components/Loader";
import styled from "styled-components";
import MovieSlider from "../../components/MovieSlider";
import { BG_COLOR } from "../../constants/Colors";
import Section from "../../components/Section";
import MovieItem from "../../components/MovieItem";

const Container = styled.ScrollView`
  background-color: ${BG_COLOR};
`;

const MoviesPresenter = ({ loading, upcoming, popular, nowPlaying }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      {nowPlaying ? <MovieSlider movies={nowPlaying} /> : null}
      {popular ? (
        <Section title="Popular Movies" horizontal={true}>
          {popular
            .filter(movie => movie.poster_path !== null)
            .map(movie => (
              <MovieItem
                id={movie.id}
                posterPhoto={movie.poster_path}
                title={movie.title}
                voteAvg={movie.vote_average}
                backgroundPhoto={movie.backdrop_path}
                overview={movie.overview}
              />
            ))}
        </Section>
      ) : null}
      {upcoming ? (
        <Section title="Upcoming Movies" horizontal={false}>
          {upcoming
            .filter(movie => movie.poster_path !== null)
            .map(movie => (
              <MovieItem
                horizontal={true}
                id={movie.id}
                posterPhoto={movie.poster_path}
                title={movie.title}
                voteAvg={movie.vote_average}
                overview={movie.overview}
                backgroundPhoto={movie.backdrop_path}
              />
            ))}
        </Section>
      ) : null}
    </Container>
  );

MoviesPresenter.propTypes = {
  loading: PropTypes.bool.isRequired,
  upcoming: PropTypes.array,
  popular: PropTypes.array,
  nowPlaying: PropTypes.array
};

export default MoviesPresenter;
