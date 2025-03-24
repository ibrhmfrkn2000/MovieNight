import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, ImageBackground, ActivityIndicator, BackHandler } from 'react-native';
import DataBase from '../../Model/DataBase';
import { FontAwesome } from '@expo/vector-icons';
import { emailGlobal } from '../../Model/GlobalMail';
import { passwordGlobal } from '../../Model/GlobalPassword';
import { setuseranyfav, useranyfav } from '../../Model/UserAnyFav';

function HomeScreen() {
    
    const [loading, setLoading] = useState(false);
    const [randomMovie, setRandomMovie] = useState(null);
    const [forif, setforif] = useState('');

    useEffect(() => {
        setforif(useranyfav);
        const initialize = async () => {
            setLoading(true);
            try {
                let userId = await DataBase.UsersID(emailGlobal, passwordGlobal);
                let x = await DataBase.GetGenreForList(userId);
                console.log("home ekrani logu bu ve true false durumu:", x);
                setuseranyfav(x);
            } catch (error) {
                console.error("Hata oldu true false durumunda:", error);
            }
            setLoading(false);
        };

        initialize();

        const backAction = () => {
            return true;
        };

        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

        return () => backHandler.remove();
        
    }, []);

    const handleRandom = useCallback(async () => {
        setforif(useranyfav);
        setLoading(true);
        try {
            let userId = await DataBase.UsersID(emailGlobal, passwordGlobal);
            console.log("deneme userid random icin", userId);
            console.log("kullanici adi", emailGlobal, "pass", passwordGlobal);
            let result = await DataBase.GetGenreForRand(userId);
            console.log("result yazan log bu", result);

            if (result && result.length > 0) {
                const randomIndex = Math.floor(Math.random() * result.length);
                const randomGenreID = result[randomIndex];
                console.log("Rastgele GenreID:", randomGenreID);

                let genrename = await DataBase.getGenreById(randomGenreID);
                console.log("secilen genre ismi:", genrename);
                let movierand = await DataBase.getMoviesRandom(genrename);

                if (movierand && movierand.length > 0) {
                    const randomMovie = movierand[Math.floor(Math.random() * movierand.length)];
                    setRandomMovie(randomMovie);
                    console.log("Rastgele film:", randomMovie);
                } else {
                    console.log("Film gelmedi bu türle ilgili");
                    setRandomMovie(null);
                }
            } else {
                console.log("Türde bi sorun oldu ondan film yok");
                setRandomMovie(null);
            }
        } catch (error) {
            console.error("handleRandom ile ilgili şu oldu:", error);
            setRandomMovie(null);
        } finally {
            setLoading(false);
        }
    
    }, [forif]);

    const handleRandomtwo = useCallback(async () => {
        setforif(useranyfav);
        setLoading(true);
            try{
                const randomMovies = await DataBase.getMovies();
                if(randomMovies&&randomMovies.length>0){
                    const rMovie = randomMovies[Math.floor(Math.random() * randomMovies.length)];
                    setRandomMovie(rMovie);
                    console.log("Rastgele film:", rMovie); 
                }
                else {
                    console.log("Rastgele film gelmedi");
                    setRandomMovie(null);
                } 
            }
            catch (error) {
                console.error("Hata handleRandom:", error);
                setRandomMovie(null);
            }
            finally {
                setLoading(false);
            }

    }, [forif]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ImageBackground
                source={require('../../assets/fscreen.jpg')}
                style={styles.backgroundImage}
            >
                {loading ? (
                    <ActivityIndicator size="large" color="blue" />
                ) : (
                    <>
                        {randomMovie && (
                            <View style={styles.movieContainer}>
                                <Image source={{ uri: randomMovie.Poster }} style={styles.moviePoster} />
                                <Text style={styles.movieTitle}>{randomMovie.MovieName}</Text>
                                <Text style={styles.movieGenre}>{randomMovie.Genres}</Text>
                                <Text style={styles.movieAbout}>{randomMovie.About}</Text>
                            </View>
                        )}
                        <TouchableOpacity style={styles.iconButton} onPress={ forif? handleRandom : handleRandomtwo}>
                            <FontAwesome name="random" size={50} color="black" />
                        </TouchableOpacity>
                    </>
                )}
            </ImageBackground>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconButton: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.2,
        shadowRadius: 2,
        marginTop: 10,
    },
    movieContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    moviePoster: {
        width: 200,
        height: 300,
        resizeMode: 'contain',
        marginBottom: 20,
        borderRadius: 10,
    },
    movieTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },
    movieGenre: {
        fontSize: 18,
        fontStyle: 'italic',
        color: 'white',
        marginBottom: 10,
    },
    movieAbout: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
});

export default HomeScreen;
