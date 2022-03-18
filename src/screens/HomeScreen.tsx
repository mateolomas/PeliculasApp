import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, ActivityIndicator, Dimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import movieDB from '../api/movieDB';
import MoviePoster from '../components/MoviePoster';
import useMovies from '../hooks/useMovies';
import {MovieDB} from '../interfaces/movieInterface';
import Carousel from 'react-native-snap-carousel';
import {ScrollView} from 'react-native';
import HorizontalSlider from '../components/HorizontalSlider';

const {width: viewportWidth} = Dimensions.get('window');

const HomeScreen = () => {
  const {nowPlaying, topRated, popular, upcoming, isLoading} = useMovies();
  const {top} = useSafeAreaInsets();

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
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
  );
};

export default HomeScreen;
