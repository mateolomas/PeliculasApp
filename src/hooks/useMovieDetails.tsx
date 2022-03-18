import React from 'react';
import {View, Text} from 'react-native';
import movieDB from '../api/movieDB';
import {MovieDetailsInterface} from '../interfaces/movieInterface';
import {useEffect} from 'react';
import {Credits} from '../interfaces/creditsInterface';

interface MovieDetails {
  isLoading: boolean;
  movieFull?: MovieDetailsInterface;
  cast: any[];
}

const useMovieDetails = (movieId: number) => {
  const [movieDetails, setMovieDetails] = React.useState<MovieDetails>({
    isLoading: true,
    movieFull: undefined,
    cast: [],
  });

  const getMovieDetails = async () => {
    const resp = await movieDB.get<MovieDetailsInterface>(`/${movieId}`);

    const credits = await movieDB.get<Credits>(`/${movieId}/credits`);

    const [movieDetail, cast] = await Promise.all([resp, credits]);

    setMovieDetails({
      isLoading: false,
      movieFull: movieDetail.data,
      cast: cast.data.cast,
    });
  };

  useEffect(() => {
    getMovieDetails();
  }, []);

  return {
    ...movieDetails,
  };
};

export default useMovieDetails;
