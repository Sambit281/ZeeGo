import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import ZegoExpressEngine from 'zego-express-engine-reactnative';

const APP_ID = 35360537;
const APP_SIGN = "610c5c912e00881ffae2badaa85fff1c1ee8d7a91c92ccf54cd0d39ec19edcf8";

let zegoEngine = null; // Store global reference

export default function HomeScreen({ route, navigation }) {
  const { userID } = route.params;
  const [targetUserID, setTargetUserID] = useState('');

  useEffect(() => {
    async function initZego() {
      try {
        if (!zegoEngine) {
          zegoEngine = await ZegoExpressEngine.createEngine(APP_ID, APP_SIGN, true);
        }

        zegoEngine.loginRoom("call_room", { userID, userName: `User_${userID}` }, { userUpdate: true });

        zegoEngine.on("IMRecvCustomCommand", (roomID, fromUser, command) => {
          if (command === "CALL_REQUEST") {
            Alert.alert(
              "Incoming Call",
              `Call from ${fromUser.userName}`,
              [
                { text: "Reject", style: "cancel" },
                { text: "Accept", onPress: () => navigation.navigate("Call", { callerID: fromUser.userID }) }
              ]
            );
          }
        });
      } catch (error) {
        console.error("Zego Initialization Error:", error);
      }
    }

    initZego();

    return () => {
      if (zegoEngine) {
        zegoEngine.logoutRoom("call_room");
        ZegoExpressEngine.destroyEngine();
        zegoEngine = null;
      }
    };
  }, []);

  const sendCallRequest = async () => {
    if (!targetUserID) {
      return Alert.alert("Enter a valid User ID");
    }

    try {
      if (!zegoEngine) {
        zegoEngine = await ZegoExpressEngine.createEngine(APP_ID, APP_SIGN, true);
      }
      await zegoEngine.sendCustomCommand("call_room", [{ userID: targetUserID, userName: "Receiver" }], "CALL_REQUEST");
      Alert.alert("Call Sent", `Calling ${targetUserID}...`);
    } catch (error) {
      console.error("Error sending call request:", error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>User: {userID}</Text>
      <TextInput
        placeholder="Enter User ID to Call"
        style={{ borderWidth: 1, width: 200, marginVertical: 10, padding: 5 }}
        onChangeText={setTargetUserID}
      />
      <Button title="Call" onPress={sendCallRequest} />
    </View>
  );
}
