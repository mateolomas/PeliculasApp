import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect} from 'react';
import {View, ActivityIndicator, Dimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import movieDB from '../api/movieDB';
import MoviePoster from '../components/MoviePoster';
import useMovies from '../hooks/useMovies';
import {MovieDB} from '../interfaces/movieInterface';
import Carousel from 'react-native-snap-carousel';
import {ScrollView} from 'react-native';
import HorizontalSlider from '../components/HorizontalSlider';
import {GradientBackground} from '../components/GradientBackground';
import {GradientContext} from '../context/GradientContext';
import {getImageColors} from '../helpers/getColores';

const {width: viewportWidth} = Dimensions.get('window');

const HomeScreen = () => {
  const {nowPlaying, topRated, popular, upcoming, isLoading} = useMovies();
  const {top} = useSafeAreaInsets();
  const {setMainColors} = useContext(GradientContext);
  const getPosterColors = async (index: number) => {
    const movie = nowPlaying[index];
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    const [primary = 'green', secondary = 'orange'] = await getImageColors(uri);
    setMainColors({primary, secondary});
  };

  useEffect(() => {
    if (nowPlaying.length > 0) {
      getPosterColors(0);
    }
  }, [nowPlaying]);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <GradientBackground>
      <ScrollView>
        <View
          style={{
            marginTop: top,
          }}>
          <View>
            <Carousel
              data={nowPlaying}
              renderItem={({item}) => <MoviePoster movie={item} />}
              sliderWidth={viewportWidth}
              itemWidth={200}
              itemHeight={300}
              layout={'default'}
              loop={true}
              autoplay={true}
              autoplayInterval={3000}
              autoplayDelay={500}
              onSnapToItem={index => console.log(index)}
            />
          </View>

          <HorizontalSlider title="Popular Movies" movies={popular} />
          <HorizontalSlider title="New movies" movies={upcoming} />
          <HorizontalSlider title="Top Rated" movies={topRated} />
        </View>
      </ScrollView>
    </GradientBackground>
  );
};

export default HomeScreen;
