import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { ZegoExpressEngine } from 'zego-express-engine-reactnative';

const APP_ID = 123456789; // Replace with your ZegoCloud AppID
const APP_SIGN = "your_app_sign_here"; // Replace with your AppSign

export default function HomeScreen({ route, navigation }) {
  const { userID } = route.params;
  const [targetUserID, setTargetUserID] = useState('');

  useEffect(() => {
    const zegoEngine = new ZegoExpressEngine(APP_ID, APP_SIGN);
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

    return () => zegoEngine.logoutRoom("call_room");
  }, []);

  const sendCallRequest = () => {
    if (!targetUserID) return Alert.alert("Enter a valid User ID");
    const zegoEngine = new ZegoExpressEngine(APP_ID, APP_SIGN);
    zegoEngine.sendCustomCommand("call_room", [{ userID: targetUserID, userName: "Receiver" }], "CALL_REQUEST");
    Alert.alert("Call Sent", `Calling ${targetUserID}...`);
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
