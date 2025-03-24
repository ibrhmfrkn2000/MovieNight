import React, { useEffect, useState } from 'react';
import DataBase from '../Model/DataBase';
import { TextInput, Button, View, FlatList, StyleSheet, Text, ScrollView, ActivityIndicator, BackHandler, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

function AdminPanel(){

  const navigation = useNavigation();
    
    useEffect(() => {   
        setLoading(true);
        const fetchGenres = async () => {
          const fetchedGenres = await DataBase.getGenre();
          const formattedGenres = fetchedGenres.map((item, index) => ({
              id: index.toString(),
              name: item.GenreName
          }));
          setGenreslist(formattedGenres);
      };
      fetchGenres();
      setLoading(false);

      const backAction = () => {
        Alert.alert("Uyarı", "Çıkış yapıyorsunuz!", [
            { text: "Tamam", onPress: () => navigation.navigate('FirstScreen') }
        ]);
        return true;
    };

    const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
    );

    return () => backHandler.remove();
      }, []);

      const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{item.name}</Text>
        </View>
    );

    

    const [Genre, setGenre] = useState('');
    const [movieNames, setmovieName] = useState('');
    const [mGenre, setmGenre] = useState('');
    const [About, setAbout] = useState('');
    const [ExUri, setExUri] = useState('');
    const [NewUri, setNewUri] = useState('');
    const [UpdateUri, setUpdateUri] = useState('');
    const [genreslist, setGenreslist] = useState([]);
    const [loading, setLoading] = useState(false);

    function addGenres(){
        DataBase.addGenre(Genre);
        fetchGenres();
    }

    const pickImage = async () => {
      let result = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (result.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
      }
  
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [9, 16],
          quality: 1,
      });
  
      if (!pickerResult.canceled) {
          setExUri(pickerResult.assets[0].uri);
          setTimeout(() => {
            var x = ExUri;
            if(ExUri.length>0){
              console.log('ExUri after set:', ExUri);
              DataBase.addMovie( mGenre, ExUri, movieNames, About);
        }
        else{ console.error("olmadı valla",x)  }
          }, 500);
          
          console.log(ExUri);
      }
  };

  const UpdateImage = async () => {
    let result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (result.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [9, 16],
        quality: 1,
    });

    if (!pickerResult.canceled) {
        setNewUri(pickerResult.assets[0].uri);
        setTimeout(() => {
          let x = NewUri;
          if(NewUri.length>0){
            console.log('ExUri set edildikten sonra:', NewUri);
            DataBase.UpdatePosterUri(NewUri, UpdateUri)
      }
      else{ console.error("olmadı valla",x)  }
        }, 1000);
        
        console.log(ExUri);
    }
};
    
return(
  
  <View contentContainerStyle={styles.container}><ScrollView>
    {loading && <ActivityIndicator size="large" color="blue"/>}
    <TextInput
          placeholder="Tür gir"
          value={Genre}
          onChangeText={setGenre}
        />
    <Button title="Tür gir" onPress={addGenres} />

    <TextInput
          placeholder="Filmin türü"
          value={mGenre}
          onChangeText={setmGenre}
        />
    <TextInput
          placeholder="Film ismi"
          value={movieNames}
          onChangeText={setmovieName}
        />
    <TextInput
          placeholder="Film hakkında"
          value={About}
          onChangeText={setAbout}
        />
    <Button title="Pick an image from camera roll" onPress={pickImage} />
    <TextInput
          placeholder="Posteri güncellemek için film ismini gir"
          value={UpdateUri}
          onChangeText={setUpdateUri}
        />
      <Button title="Pick an image from camera roll" onPress={UpdateImage} />
      </ScrollView>
      <FlatList
                data={genreslist}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={{ flexGrow: 1 }}
            />
            
    </View>
);
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: '#f8f8f8',
},
  item: {
      backgroundColor: '#fff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 5,
      borderColor: '#ddd',
      borderWidth: 1,
  },
  title: {
      fontSize: 18,
  },
});

export default AdminPanel;