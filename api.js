import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "4769845e6dd4b68fa6958ca760228cbc",
    language: "ko-KR"
  }
});

export const tvApi = {
  airingThisWeek: () => api.get("tv/on_the_air"),
  popular: () => api.get("tv/popular"),
  airingToday: () => api.get("tv/airing_today"),
  tvDetail: id =>
    api.get(`tv/${id}`, {
      params: {
        append_to_response: "videos"
      }
    }),
  search: searchWords =>
    api.get("search/tv", {
      params: {
        query: encodeURIComponent(searchWords)
      }
    })
};

export const moviesApi = {
  nowPlaying: () => api.get("movie/now_playing"),
  upcoming: () => api.get("movie/upcoming"),
  popular: () => api.get("movie/popular"),
  movieDetail: id =>
    api.get(`movie/${id}`, {
      params: {
        append_to_response: "videos"
      }
    }),
  search: searchWords =>
    api.get("search/movie", {
      params: {
        query: encodeURIComponent(searchWords)
      }
    }),
  collection: collectionId => api.get(`collection/${collectionId}`)
};
