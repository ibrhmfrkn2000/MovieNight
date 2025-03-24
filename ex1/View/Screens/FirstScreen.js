import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, BackHandler, Alert } from 'react-native';
import AwesomeButton, { ThemedButton } from 'react-native-really-awesome-button';
import { islogin, setislogin } from '../../Model/IsUserLogin';

function FirstScreen() {
    const navigation = useNavigation();
    useEffect(() => {
        setislogin(false);

        const backAction = () => {
            Alert.alert('Dikkat!', 'Uygulamadan çıkmak istiyor musunuz?', [
                { text: 'Hayır', onPress: () => null },
                { text: 'Evet', onPress: () => BackHandler.exitApp() },
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

        return () => backHandler.remove();
        
      }, []);
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets/fscreen.jpg')}
                style={styles.backgroundImage}
            >
                <View style={styles.buttonContainer}>
                    <ThemedButton name="bruce" type='primary' style={styles.button} onPress={() => { navigation.navigate("SignInScreen"); }}>Kayıt ol</ThemedButton>
                    <ThemedButton name="bruce" type='secondary' onPress={() => { navigation.navigate("LoginScreen"); }}>Giriş</ThemedButton>
                    <Text style={styles.text}>Zaten hesabınız varsa giriş yapmayı{"\n"}deneyin</Text>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        paddingBottom: 30,
    },
    button: {
        marginBottom: 15,
    },
    text: {
        fontFamily: 'sans-serif-medium',
        color:"rgba(255, 255, 255, 0.8)",
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
        marginVertical: 4,
        backgroundColor:"rgba(0, 0, 0, 0.3)",
        paddingHorizontal:7,
        borderRadius:8        
    }
});

export default FirstScreen;