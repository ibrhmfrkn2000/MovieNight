import * as React from 'react';
import { FontAwesome, Fontisto } from '@expo/vector-icons';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import FirstScreen from '../View/Screens/FirstScreen';
import SignInScreen from '../View/Screens/SignInScreen';
import LoginScreen from '../View/Screens/LoginScreen';
import AdminPanel from '../View/AdminPanel';
import HomeScreen from '../View/Screens/HomeScreen';
import MovieList from '../View/Screens/MovieListScreen';
import FavGenreScreen from '../View/Screens/FavGenreScreen';

const Drawer = createDrawerNavigator();




function CustomDrawerContent(props) {

  const navigation = useNavigation();
  function handleLogout(){ navigation.navigate('FirstScreen');   }
  return (
    <DrawerContentScrollView {...props} style={styles.drawerContent}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerHeaderText}>Menü</Text>
      </View>
      <DrawerItemList {...props} />
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
    
    </DrawerContentScrollView>
  );
}

function LogoTitle() {
  return (
    <View style={styles.logoContainer}>
      <Image
        style={styles.logoImage}
        source={require('../assets/film.png')}
      />
      <Text style={styles.logoText}>Movie Night</Text>
    </View>
  );
}



function DrawerScreens() {
  return (
    <Drawer.Navigator
      initialRouteName='FirstScreen'
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ 
        drawerLabelStyle: { 
          fontSize: 16,
          fontWeight: 'normal',
        },
        drawerActiveTintColor: '#FFD700',
        drawerInactiveTintColor: '#CCCCCC', 
      }}
    >
      <Drawer.Screen name="FirstScreen" component={FirstScreen} options={{ headerTitle: (props) => <LogoTitle {...props} />, headerTitleAlign: 'center', headerStyle: { backgroundColor: "#FFD700" }, headerLeft: () => null, swipeEnabled: false, drawerLabel: () => null, drawerItemStyle: { display: 'none' }}}/>
      <Drawer.Screen name="SignInScreen" component={SignInScreen} options={{ headerTitle: (props) => <LogoTitle {...props} />, headerTitleAlign: 'center', headerStyle: { backgroundColor: "#FFD700" }, headerLeft: () => null, swipeEnabled: false, drawerLabel: () => null, drawerItemStyle: { display: 'none' }}}/>
      <Drawer.Screen name="LoginScreen" component={LoginScreen} options={{ headerTitle: (props) => <LogoTitle {...props} />, headerTitleAlign: 'center', headerStyle: { backgroundColor: "#FFD700" }, headerLeft: () => null, swipeEnabled: false, drawerLabel: () => null, drawerItemStyle: { display: 'none' }}}/>
      <Drawer.Screen name="Home" component={HomeScreen} options={{ headerTitle: (props) => <LogoTitle {...props} />, headerTitleAlign: 'center', headerStyle: { backgroundColor: "#FFD700" },
      drawerLabel: ({ focused, color }) => (<Text style={[styles.drawerLabel, { color: focused ? '#FFD700' : '#CCCCCC' }]}>Rasgele Film</Text>),
       drawerIcon: ({ focused, size }) => (<FontAwesome name="random" size={size} color={focused ? '#FFD700' : '#CCCCCC'}/>),}}/>
      <Drawer.Screen name="list" component={MovieList} options={{ headerTitle: (props) => <LogoTitle {...props} />, headerTitleAlign: 'center', headerStyle: { backgroundColor: "#FFD700" }, 
      drawerLabel: ({ focused, color }) => (<Text style={[styles.drawerLabel, { color: focused ? '#FFD700' : '#CCCCCC' }]}>Film Listesi</Text>), 
      drawerIcon: ({ focused, size }) => (<FontAwesome name="film" size={size} color={focused ? '#FFD700' : '#CCCCCC'}/>)}}/>
      <Drawer.Screen name="Admin" component={AdminPanel} options={{ headerTitle: (props) => <LogoTitle {...props} />, headerTitleAlign: 'center', headerStyle: { backgroundColor: "#FFD700" }, headerLeft: () => null, swipeEnabled: false, drawerLabel: () => null, drawerItemStyle: { display: 'none' }}}/>
      <Drawer.Screen name="FavGenreScreen" component={FavGenreScreen} options={{ headerTitle: (props) => <LogoTitle {...props} />, headerTitleAlign: 'center', headerStyle: { backgroundColor: "#FFD700" }, 
      drawerLabel: ({ focused, color }) => (<Text style={[styles.drawerLabel, { color: focused ? '#FFD700' : '#CCCCCC' }]}>Favori türlerin</Text>), 
      drawerIcon: ({ focused, size }) => (<Fontisto name="favorite" size={size} color={focused ? '#FFD700' : '#CCCCCC'}/>)}}/>
    </Drawer.Navigator>
  );
  
}



const RouterFile = () => {
  return (
    <NavigationContainer>
      <DrawerScreens/>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    width: 30,
    height: 30,
  },
  logoText: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
  drawerHeader: {
    height: 80,
    justifyContent: 'center',
    paddingLeft: 20,
    backgroundColor: '#292929',
    marginBottom:30
  },
  drawerHeaderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  drawerContent: {
    flex: 1,
    backgroundColor: '#313131',
  },
  drawerLabel: { 
    fontSize: 16,
    fontWeight: 'normal',
  },
  logoutButton: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F5F5F5',
  },
});

export default RouterFile;
