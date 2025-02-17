import React, { useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import ZegoExpressEngine from 'zego-express-engine-reactnative';

const APP_ID = 35360537;
const APP_SIGN = "610c5c912e00881ffae2badaa85fff1c1ee8d7a91c92ccf54cd0d39ec19edcf8";

export default function CallScreen({ route, navigation }) {
  const { callerID } = route.params;
  const userID = Math.floor(Math.random() * 10000).toString();

  useEffect(() => {
    // Initialize ZegoExpressEngine
    ZegoExpressEngine.createEngine(APP_ID, APP_SIGN, true);

    // Join the call room
    ZegoExpressEngine.instance().loginRoom(
      callerID,
      { userID, userName: `User_${userID}` },
      { userUpdate: true }
    );

    return () => {
      ZegoExpressEngine.instance().logoutRoom(callerID);
      ZegoExpressEngine.destroyEngine();
    };
  }, []);

  const startCall = async () => {
    // Start publishing video
    await ZegoExpressEngine.instance().startPublishingStream(callerID);
    await ZegoExpressEngine.instance().startPlayingStream(callerID);
  };

  const endCall = async () => {
    await ZegoExpressEngine.instance().stopPublishingStream();
    await ZegoExpressEngine.instance().stopPlayingStream();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Button title="Start Call" onPress={startCall} />
      <Button title="End Call" onPress={endCall} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
});
