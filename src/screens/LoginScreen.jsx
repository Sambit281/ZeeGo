import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import ZEGOSDKManager from '../../services/ZEGOSDKManager';

const ZEGO_APP_ID = 35360537;  // Get from ZEGO Console
const ZEGO_APP_SIGN = '610c5c912e00881ffae2badaa85fff1c1ee8d7a91c92ccf54cd0d39ec19edcf8'; // Get from ZEGO Console
const ZEGO_SCENARIO = 0; // General sce

export default function LoginScreen({ navigation }) {
  const [userID, setUserID] = useState(Math.floor(Math.random() * 10000).toString());

  const handleLogin = () => {
    ZEGOSDKManager.getInstance().initSDK(
      ZEGO_APP_ID,      // Replace with your actual App ID
      ZEGO_APP_SIGN,    // Replace with your actual App Sign
      0                 // General scenario
    ).then(() => {
      navigation.navigate('OutgoingCallScreen', { 
        userIds: [userID],
        isVideoCall: false
      });
    }).catch(error => {
      console.error('SDK initialization failed:', error);
    });
    navigation.navigate('OutgoingCallScreen', { userIds: [userID], isVideoCall: false });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Enter User ID</Text>
      <TextInput
        style={{ borderWidth: 1, width: 200, padding: 5, marginVertical: 10 }}
        value={userID}
        onChangeText={setUserID}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
