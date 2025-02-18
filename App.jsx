// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import LoginScreen from './src/screens/LoginScreen';
// import HomeScreen from './src/screens/HomeScreen';
// import CallScreen from './src/screens/CallScreen';
// import { PermissionsAndroid } from 'react-native';

// const Stack = createStackNavigator();

// export default function App() {
//   const granted = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA,
//     PermissionsAndroid.RECORD_AUDIO);

//   granted.then((data) => {

//     if (!data) {
//       const permissions = [PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, PermissionsAndroid.PERMISSIONS.CAMERA];
//       PermissionsAndroid.requestMultiple(permissions);
//     }
//   }).catch((err) => {
//     console.log(err.toString());
//   })

//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Login">
//         <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
//         <Stack.Screen name="Call" component={CallScreen} options={{ title: 'Call' }} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import App from './src/screens/HomeScreen';
import CallScreen from './src/screens/CallScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={App} />
        <Stack.Screen name="CallScreen" component={CallScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
