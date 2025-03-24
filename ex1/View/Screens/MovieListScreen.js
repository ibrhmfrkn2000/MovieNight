import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import DataBase from '../../Model/DataBase';

function MovieListScreen() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const dbMovies = await DataBase.getMovies();
        setMovies(dbMovies);
      } catch (error) {
        console.error('Film cekerken hata listscreen:', error);
      }
    }

    fetchMovies();
  }, []);

  const renderMovieItem = ({ item }) => (
    <View style={styles.movieContainer}>
      <Image source={{ uri: item.Poster }} style={styles.poster} />
      <View style={styles.movieInfo}>
        <Text style={styles.movieName}>{item.MovieName}</Text>
        <Text style={styles.genre}>{item.Genres}</Text>
        <Text style={styles.about}>{item.About}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.ID.toString()}
        style={{ flexGrow: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  movieContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  poster: {
    width: 100,
    height: 150,
    marginRight: 10,
  },
  movieInfo: {
    flex: 1,
  },
  movieName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  genre: {
    fontStyle: 'italic',
    marginBottom: 5,
  },
  about: {
    marginBottom: 5,
  },
});

export default MovieListScreen;