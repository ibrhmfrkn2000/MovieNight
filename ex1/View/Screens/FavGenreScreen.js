import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DataBase from '../../Model/DataBase';
import { emailGlobal } from '../../Model/GlobalMail';
import { passwordGlobal } from '../../Model/GlobalPassword';
import { setuseranyfav, useranyfav } from '../../Model/UserAnyFav';

function FavGenreScreen() {
    const [email, setEmail] = useState('');
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [error, setError] = useState('');

    const navigation = useNavigation();

    useEffect(() => {
        const getid=async()=>{
        let userId = await DataBase.UsersID(emailGlobal, passwordGlobal);
        setEmail(userId);
            }
            getid();
    }, []);

    const handlePress = async(genre) => {
     if(!useranyfav){
        if (!selectedGenres.includes(genre)) {
            setSelectedGenres([...selectedGenres, genre]);
            let UserGenre = await DataBase.getGenreByName(genre);
            DataBase.addUserGenre(email, UserGenre);
        }
      }
      else{
        setError('Zaten bir kere seçim yaptınız');
        setTimeout(() => {
            setError('');
        }, 2000);
        
      }
    };

    const handleComplete = () =>{

        navigation.navigate('Home');
        setuseranyfav(true);

    }

    const genres = [
        "Aksiyon", "Aile", "Animasyon", "Belgesel", "Bilim kurgu",
        "Biyografi", "Dram", "Fantastik", "Gerilim", "Gizem",
        "Komedi", "Korku", "Macera", "Müzik", "Romantik",
        "Savaş", "Suç", "Tarih", "Vahşi batı", "Yerli"
    ];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ImageBackground
                source={require('../../assets/fscreen.jpg')}
                style={styles.backgroundImage}
            >
            <Text style={styles.warning}>Lütfen dikkatli seçiniz, daha sonra değişiklik yapılamaz.</Text>
            <View style={styles.grid}>
                {genres.map((genre) => (
                    <TouchableOpacity
                        key={genre}
                        onPress={() => handlePress(genre)}
                        style={[
                            styles.button,
                            selectedGenres.includes(genre) && styles.buttonSelected
                        ]}
                        disabled={selectedGenres.includes(genre)}
                    >
                        <Text style={styles.buttonText}>{genre}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
                    <Text style={styles.completeButtonText}>Tamamlandı</Text>
                </TouchableOpacity>
            </ImageBackground>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
    },
    warning: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF0000',
        marginBottom: 20,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 30,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#CCCCCC',
        padding: 10,
        margin: 5,
        borderRadius: 10,
        minWidth: 100,
        alignItems: 'center',
    },
    buttonSelected: {
        backgroundColor: '#00CC00',
    },
    buttonText: {
        color: '#000000',
        fontSize: 16,
    },
    completeButton: {
        backgroundColor: '#008CBA',
        padding: 15,
        marginTop: 20,
        borderRadius: 10,
        minWidth: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
    completeButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    error:{ 
        color: '#c70000',
        marginBottom: 10,
        fontWeight:'bold',
        shadowColor:'black',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 1,
        }
});

export default FavGenreScreen;