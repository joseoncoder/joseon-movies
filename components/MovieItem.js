import React from "react";
import PropTypes from "prop-types";
import { TouchableWithoutFeedback } from "react-native";
import { withNavigation } from "react-navigation";
import styled from "styled-components";
import MoviePoster from "./MoviePoster";
import MovieRating from "./MovieRating";
import { TINT_COLOR, GREY_COLOR } from "../constants/Colors";

const Container = styled.View`
  align-items: center;
  margin-right: 15px;
`;

const Title = styled.Text`
  color: ${TINT_COLOR};
  font-size: ${props => (!props.big ? "12px" : "14px")};
  margin-vertical: 5px;
`;

const HContainer = styled.View`
  margin-bottom: 20px;
  flex-direction: row;
`;

const Column = styled.View`
  margin-left: 10px;
  width: 65%;
`;

const Overview = styled.Text`
  color: ${GREY_COLOR};
  font-size: 12px;
  margin-vertical: 10px;
`;

const MovieItem = ({
  id,
  posterPhoto,
  title,
  voteAvg,
  overview,
  backgroundPhoto,
  horizontal = false,
  isMovie = true,
  navigation
}) => (
  <TouchableWithoutFeedback
    onPress={() =>
      navigation.navigate({
        routeName: "Detail",
        params: {
          isMovie,
          id,
          posterPhoto,
          backgroundPhoto,
          title,
          voteAvg,
          overview
        }
      })
    }
  >
    {horizontal ? (
      <HContainer>
        <MoviePoster path={posterPhoto} />
        <Column>
          <Title big={true}>{title}</Title>
          <MovieRating votes={voteAvg} inSlide={false} />
          {overview ? (
            <Overview>
              {overview.length > 200
                ? `${overview.substring(0, 197)}...`
                : overview}
            </Overview>
          ) : null}
        </Column>
      </HContainer>
    ) : (
      <Container>
        <MoviePoster path={posterPhoto} />
        <Title>
          {title.length > 20 ? `${title.substring(0, 17)}...` : title}
        </Title>
        <MovieRating votes={voteAvg} inSlide={false} />
      </Container>
    )}
  </TouchableWithoutFeedback>
);

MovieItem.propTypes = {
  id: PropTypes.number.isRequired,
  posterPhoto: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  voteAvg: PropTypes.number.isRequired,
  overview: PropTypes.string,
  isMovie: PropTypes.bool
};

export default withNavigation(MovieItem);
