import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { BG_COLOR, GREY_COLOR, TINT_COLOR } from "../../constants/Colors";
import Layout from "../../constants/Layout";
import Loader from "../../components/Loader";
import Section from "../../components/Section";
import MovieItem from "../../components/MovieItem";

const Container = styled.View`
  flex: 1;
  background-color: ${BG_COLOR};
`;

const InputContainer = styled.View`
  align-items: center;
  margin-vertical: 20px;
`;

const Input = styled.TextInput`
  background-color: rgba(255, 255, 255, 1);
  width: ${Layout.width / 1.5};
  border-radius: 10px;
  padding: 10px;
`;

const SearchResults = styled.ScrollView`
  margin-top: 20px;
`;

const FailContainer = styled.View`
  align-items: center;
  text-align: center;
`;
const SearchFail = styled.Text`
  text-align: center;
`;

const SearchPresenter = ({
  loading,
  movieResults,
  tvResults,
  searchTerm,
  handleSearchUpdate,
  onSubmitEditing,
  error
}) => (
  <Container>
    <InputContainer>
      <Input
        onChangeText={handleSearchUpdate}
        value={searchTerm}
        returnKeyType="search"
        placeholder="Search Movies and TV"
        placeholderTextColor={GREY_COLOR}
        onSubmitEditing={onSubmitEditing}
        autoCorrect={false}
      />
    </InputContainer>
    <SearchResults>
      {loading ? (
        <Loader />
      ) : (
        <>
          {movieResults ? (
            <Section title="Movie Results">
              {movieResults.length > 0 ? (
                movieResults
                  .filter(movie => movie.poster_path !== null)
                  .map(movie => (
                    <MovieItem
                      key={movie.id}
                      id={movie.id}
                      posterPhoto={movie.poster_path}
                      title={movie.title}
                      voteAvg={movie.vote_average}
                      overview={movie.overview}
                    />
                  ))
              ) : (
                <FailContainer>
                  <SearchFail>
                    " {searchTerm} " 에 관련된 자료가 없습니다.
                  </SearchFail>
                </FailContainer>
              )}
            </Section>
          ) : null}
          {tvResults ? (
            <Section title="TV Results">
              {tvResults.length > 0 ? (
                tvResults
                  .filter(tv => tv.poster_path !== null)
                  .map(tv => (
                    <MovieItem
                      isMovie={false}
                      key={tv.id}
                      id={tv.id}
                      posterPhoto={tv.poster_path}
                      title={tv.name}
                      voteAvg={tv.vote_average}
                    />
                  ))
              ) : (
                <FailContainer>
                  <SearchFail>
                    " {searchTerm} " 에 관련된 자료가 없습니다.
                  </SearchFail>
                </FailContainer>
              )}
            </Section>
          ) : null}
        </>
      )}
    </SearchResults>
  </Container>
);

SearchPresenter.propTypes = {
  loading: PropTypes.bool.isRequired,
  movieResults: PropTypes.array,
  tvResults: PropTypes.array,
  searchTerm: PropTypes.string,
  handleSearchUpdate: PropTypes.func.isRequired,
  onSubmitEditing: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default SearchPresenter;
