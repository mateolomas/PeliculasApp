import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacityBase,
  TouchableOpacity,
} from 'react-native';
import {Movie} from '../interfaces/movieInterface';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

export type RootStackParamList = {
  DetailsScreen: Movie;
};

interface Props {
  movie: Movie;
  height?: number;
  width?: number;
}

const MoviePoster = ({movie, height = 300, width = 200}: Props) => {
  const uri = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('DetailsScreen', movie)}
      style={{
        width,
        height,
        marginHorizontal: 5,
      }}>
      <View style={styles.imageContainer}>
        <Image source={{uri}} style={styles.image} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    borderRadius: 10,
  },
  imageContainer: {
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
  },
});

export default MoviePoster;
