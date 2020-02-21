import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Layout from "../../constants/Layout";
import makePhotoUrl from "../..//utils/makePhotoUrl";
import MoviePoster from "../../components/MoviePoster";
import MovieRating from "../../components/MovieRating";
import Loader from "../../components/Loader";
import { BG_COLOR, TINT_COLOR } from "../../constants/Colors";

const Container = styled.ScrollView`
  background-color: ${BG_COLOR};
  position: relative;
`;

const Header = styled.View`
  position: relative;
`;

const BgImage = styled.Image`
  width: ${Layout.width};
  height: ${Layout.height / 3.5};
  position: absolute;
`;

const Content = styled.View`
  flex-direction: row;
  width: 80%;
  align-items: flex-end;
  padding-horizontal: 20px;
  height: ${Layout.height / 3.5};
`;

const Column = styled.View`
  color: ${TINT_COLOR};
  margin-left: 30px;
  z-index: 1;
`;

const Title = styled.Text`
  color: ${TINT_COLOR};
  font-size: 14px;
  font-weight: 600;

  margin-bottom: 10px;
  width: ${Layout.width / 1.2};
`;

const MainContent = styled.View`
  padding-horizontal: 20px;
  margin-top: 25px;
  width: 80%;
`;

const ContentTitle = styled.Text`
  color: ${TINT_COLOR};
  font-weight: 600;
  margin-bottom: 10px;
`;

const ContentValue = styled.Text`
  color: ${TINT_COLOR};
  font-size: 12px;
  margin-bottom: 10px;
  width: 80%;
`;

const DataContainer = styled.View`
  margin-bottom: 10px;
`;

const Genres = styled.Text`
  color: ${TINT_COLOR};
  font-size: 10px;
  margin-top: 10px;
  width: 80%;
`;

const DetailPresenter = ({
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
  genres
}) => (
  <Container>
    <Header>
      <BgImage source={{ uri: makePhotoUrl(backgroundPhoto) }} />
      <LinearGradient
        colors={["transparent", "black"]}
        start={Platform.select({
          ios: [0, 0]
        })}
        end={Platform.select({
          ios: [0, 0.5],
          android: [0, 0.9]
        })}
      >
        <Content>
          <MoviePoster path={posterPhoto} />
          <Column>
            <Title>{title}</Title>
            <MovieRating votes={voteAvg} inSlide={true} />
            {genres ? (
              <Genres>
                {genres.map((genre, index) =>
                  index === genres.length - 1 ? genre.name : `${genre.name} / `
                )}
              </Genres>
            ) : null}
          </Column>
        </Content>
      </LinearGradient>
    </Header>

    <MainContent>
      {overview ? (
        <DataContainer>
          <ContentTitle>Overview</ContentTitle>
          <ContentValue>{overview}</ContentValue>
        </DataContainer>
      ) : null}
      {status ? (
        <DataContainer>
          <ContentTitle>Status</ContentTitle>
          <ContentValue>{status}</ContentValue>
        </DataContainer>
      ) : null}
      {date ? (
        <DataContainer>
          <ContentTitle>
            {isMovie ? "Releas Date" : "First Episode"}
          </ContentTitle>
          <ContentValue>{date.replace(/-/gi, " / ")}</ContentValue>
        </DataContainer>
      ) : null}
    </MainContent>
    {loading ? <Loader /> : null}
  </Container>
);

DetailPresenter.propTypes = {
  id: PropTypes.number.isRequired,
  posterPhoto: PropTypes.string.isRequired,
  backgroundPhoto: PropTypes.string,
  title: PropTypes.string.isRequired,
  voteAvg: PropTypes.number,
  overview: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  isMovie: PropTypes.bool.isRequired,
  status: PropTypes.string,
  date: PropTypes.string,
  genres: PropTypes.array
};

export default DetailPresenter;
