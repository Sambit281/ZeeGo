import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import OutgoingCallScreen from './src/screens/HomeScreen';
import IncomingCallScreen from './src/screens/IncomingCallScreen';
import CallScreen from './src/screens/CallScreen';
import LoginScreen from './src/screens/LoginScreen';
import { PermissionsAndroid, Platform } from 'react-native';
import { useEffect } from 'react';
import ZEGOSDKManager from './services/ZEGOSDKManager';

const Stack = createStackNavigator();
const ZEGO_APP_ID = 35360537;  // Get from ZEGO Console
const ZEGO_APP_SIGN = '610c5c912e00881ffae2badaa85fff1c1ee8d7a91c92ccf54cd0d39ec19edcf8'; // Get from ZEGO Console
const ZEGO_SCENARIO = 0; // General sce

export default function App() {
  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS === 'android') {
        await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          PermissionsAndroid.PERMISSIONS.CAMERA,
        ]);
      }
    };

    const initializeSDK = async () => {
      try {
        await requestPermissions();
        await ZEGOSDKManager.getInstance().initSDK(
          ZEGO_APP_ID,
          ZEGO_APP_SIGN,
          ZEGO_SCENARIO
        );
        console.log('ZEGO SDK initialized successfully');
      } catch (error) {
        console.error('Failed to initialize ZEGO SDK:', error);
      }
    };

    initializeSDK();

    return () => {
      // Cleanup SDK when app is closed
      ZEGOSDKManager?.getInstance()?.destroySDK();
    };
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="OutgoingCallScreen" component={OutgoingCallScreen} />
        <Stack.Screen name="IncomingCallScreen" component={IncomingCallScreen} />
        <Stack.Screen name="CallScreen" component={CallScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
