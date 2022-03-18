import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {Cast} from '../interfaces/creditsInterface';
import {MovieDetailsInterface} from '../interfaces/movieInterface';
import CastItem from './CastItem';

interface MovieDetails {
  movieFull: MovieDetailsInterface;
  cast: Cast[];
}

const MovieDetails = ({movieFull, cast}: MovieDetails) => {
  return (
    <>
      {/* Detalles */}
      <View style={{marginHorizontal: 20}}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontSize: 20,
            }}>
            {' '}
            {movieFull.vote_average}
          </Text>

          <Text style={{marginLeft: 5, fontSize: 20}}>
            - {movieFull.genres.map(g => g.name).join(', ')}
          </Text>
        </View>

        {/* Historia */}
        <Text style={{fontSize: 23, marginTop: 10, fontWeight: 'bold'}}>
          Historia
        </Text>

        <Text style={{fontSize: 16}}>{movieFull.overview}</Text>

        {/* Historia */}
        <Text style={{fontSize: 23, marginTop: 10, fontWeight: 'bold'}}>
          Presupuesto
        </Text>
        <Text style={{fontSize: 18}}>{movieFull.budget}</Text>
      </View>

      {/* Casting */}
      <View style={{marginTop: 10, marginBottom: 100}}>
        <Text
          style={{
            fontSize: 23,
            marginTop: 10,
            fontWeight: 'bold',
            marginHorizontal: 20,
          }}>
          Actores
        </Text>

        <FlatList
          data={cast}
          keyExtractor={(item, index) => item.id.toString() + index}
          renderItem={({item}) => <CastItem actor={item} />}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{marginTop: 10, height: 70}}
        />
      </View>
    </>
  );
};

export default MovieDetails;
