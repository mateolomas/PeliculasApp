import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Button,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {RootStackParamList} from '../navigation/Navigation';
import useMovieDetails from '../hooks/useMovieDetails';
import MovieDetails from '../components/MovieDetails';

const screenHeight = Dimensions.get('window').height;

interface Props
  extends NativeStackScreenProps<RootStackParamList, 'DetailsScreen'> {}

const DetailsScreen = ({route, navigation}: Props) => {
  const movie = route.params;
  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const {isLoading, cast, movieFull} = useMovieDetails(movie.id);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imageBorder}>
          <Image source={{uri}} style={styles.image} />
        </View>
      </View>
      <View style={styles.marginContainer}>
        <Text style={styles.title}>{movie.original_title}</Text>
        <Text style={styles.subtitle}>{movie.title}</Text>
      </View>
      <View style={styles.marginContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <MovieDetails movieFull={movieFull!} cast={cast} />
        )}
      </View>

      <View style={styles.backButton}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Button title="Back" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    zIndex: 999,
    top: 50,
    left: 20,
    elevation: 5,
  },
  button: {
    fontSize: 20,
  },
  image: {
    flex: 1,
  },
  container: {
    width: '100%',

    height: screenHeight * 0.7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  imageBorder: {
    flex: 1,
    overflow: 'hidden',
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  marginContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 20,
  },
  title: {
    fontSize: 30,
  },
});

export default DetailsScreen;
