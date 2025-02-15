import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { ZegoExpressEngine } from 'zego-express-engine-reactnative';

const APP_ID = 123456789; // Replace with your ZegoCloud AppID
const APP_SIGN = "your_app_sign_here"; // Replace with your ZegoCloud AppSign
const UserID = Math.floor(Math.random() * 10000).toString(); // Generate random user ID for testing
const UserName = `User_${UserID}`;

const zegoEngine = new ZegoExpressEngine(APP_ID, APP_SIGN);

export default function App() {
  const [targetUserID, setTargetUserID] = useState('');

  useEffect(() => {
    zegoEngine.loginRoom("call_room", { userID: UserID, userName: UserName }, { userUpdate: true });
    
    zegoEngine.on("IMRecvCustomCommand", (roomID, fromUser, command) => {
      if (command === "CALL_REQUEST") {
        Alert.alert(
          "Incoming Call",
          `Call from ${fromUser.userName}`,
          [
            { text: "Reject", style: "cancel" },
            { text: "Accept", onPress: () => acceptCall(fromUser.userID) }
          ]
        );
      }
    });
  }, []);

  const sendCallRequest = () => {
    if (!targetUserID) return Alert.alert("Enter a valid User ID");
    zegoEngine.sendCustomCommand("call_room", [{ userID: targetUserID, userName: "Receiver" }], "CALL_REQUEST");
    Alert.alert("Call Sent", `Calling ${targetUserID}...`);
  };

  const acceptCall = (callerID) => {
    Alert.alert("Call Accepted", `Connecting to ${callerID}...`);
    // Here, you can integrate ZegoUIKitPrebuiltCallService for real calling
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Welcome, {UserName}</Text>
      <TextInput
        placeholder="Enter User ID to Call"
        style={{ borderWidth: 1, width: 200, marginVertical: 10, padding: 5 }}
        onChangeText={setTargetUserID}
      />
      <Button title="Send Call Invitation" onPress={sendCallRequest} />
    </View>
  );
}