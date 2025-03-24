import React,{ useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Text, TextInput, ImageBackground, ActivityIndicator } from "react-native";
import AwesomeButton, { ThemedButton } from 'react-native-really-awesome-button';
import DataBase from "../../Model/DataBase";
import { islogin, setislogin } from "../../Model/IsUserLogin";

function SignInScreen(){

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSign = async () => {
        if (validateEmail(email)&&password!='') { 
            setError('');
            setLoading(true);
            try {
                await DataBase.addUser(email, password);
                setislogin(true);
                navigation.navigate('Home');
                setEmail("");
                setPassword("");
            } catch (error) {
                console.error('User eklenirken hata (ekrandan):', error);
                setError('Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.');
            } finally {
                setLoading(false);
            }
        } else {
            setError('Lütfen geçerli bir Eposta adresi ve en az 6 karakterden oluşan bir şifre girin.');
        }
    };

    function handleback(){
        navigation.navigate('FirstScreen');
    }

    return(
        <View style={style.Conteiner}>
            <ImageBackground
                source={require('../../assets/Signscreen.jpg')}
                style={style.backgroundImage}
            >
            {loading && <ActivityIndicator size="large" color="blue"/>}   
            <TextInput
                style={ style.input }
                placeholder="Eposta adresiniz..."
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
          style={style.input}
          placeholder="Şifrenizi girin..."
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />
            {error ? <Text style={style.error}>{error}</Text> : null}
            <ThemedButton name="bruce" type='secondary'  onPress={handleSign} > Kayıt </ThemedButton>
            <ThemedButton name="bruce" type='primary'  onPress={handleback} > Geri </ThemedButton>
            </ImageBackground>
        </View>
    );

}
const style = StyleSheet.create({
    Conteiner: {
        flex: 1,
      },
      input: {
        height: '6%',
        width:'90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: '3%',
        backgroundColor:'white',
        borderRadius:5,
        textAlign:'center'
      },
      backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
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

export default SignInScreen;