import React, {useState} from 'react';
import {useEffect} from 'react';
import movieDB from '../api/movieDB';
import {Movie, MovieDB} from '../interfaces/movieInterface';

interface MoviesState {
  nowPlaying: Movie[];
  popular: Movie[];
  topRated: Movie[];
  upcoming: Movie[];
}

const useMovies = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [moviesState, setMoviesState] = useState<MoviesState>({
    nowPlaying: [],
    popular: [],
    topRated: [],
    upcoming: [],
  });

  const getMovies = async () => {
    const Now_playing = await movieDB.get<MovieDB>('/now_playing');
    const popular = await movieDB.get<MovieDB>('/popular');
    const top_rated = await movieDB.get<MovieDB>('/top_rated');
    const upcoming = await movieDB.get<MovieDB>('/upcoming');

    Promise.all([Now_playing, popular, top_rated, upcoming]).then(values => {
      setMoviesState({
        nowPlaying: values[0].data.results,
        popular: values[1].data.results,
        topRated: values[2].data.results,
        upcoming: values[3].data.results,
      });
      setIsLoading(false);
    });

    setIsLoading(false);
  };

  useEffect(() => {
    //now_playnig
    getMovies();
  }, []);

  return {...moviesState, isLoading};
};

export default useMovies;
