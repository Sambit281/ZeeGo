// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, Alert } from 'react-native';
// import { ZegoExpressEngine,ZegoScenario } from 'zego-express-engine-reactnative';

// const APP_ID = 35360537;
// const APP_SIGN = "610c5c912e00881ffae2badaa85fff1c1ee8d7a91c92ccf54cd0d39ec19edcf8";

// let zegoEngine = null; // Store global reference

// export default function HomeScreen({ route, navigation }) {
//   const { userID } = route.params;
//   const [targetUserID, setTargetUserID] = useState('');

//   useEffect(() => {
//     const initZego = async () => {
//       console.log("Initializing ZegoExpressEngine...");
  
//       if (!zegoEngine) {
//         try {
//           // Create the engine instance
//           zegoEngine = await ZegoExpressEngine?.createEngine({
//             appID: APP_ID,
//             appSign: APP_SIGN,
//             useTestEnv: true,
//             scenario: 10,
//           });
//           if(!zegoEngine){
//             throw new Error("Failed to create ZegoExpressEngine instance.");
//           }
//           // Initialize the engine
//           console.log("ZegoExpressEngine Initialized:", zegoEngine);
  
//           // Proceed with logging into the room
//           await zegoEngine?.loginRoom(
//             "call_room",
//             { userID, userName: `User_${userID}` },
//             { userUpdate: true }
//           );
//           console.log("Logged into room successfully.");
  
//           // Set up event listener for incoming calls
//           zegoEngine?.on("IMRecvCustomCommand", (roomID, fromUser, command) => {
//             if (command === "CALL_REQUEST") {
//               Alert.alert(
//                 "Incoming Call",
//                 `Call from ${fromUser.userName}`,
//                 [
//                   { text: "Reject", style: "cancel" },
//                   { text: "Accept", onPress: () => navigation.navigate("Call", { callerID: fromUser.userID }) }
//                 ]
//               );
//             }
//           });
  
//         } catch (error) {
//           console.error("Error initializing ZegoExpressEngine:", error);
//         }
//       }
//     };
  
//     try{
//       initZego();
//     }catch(err){
//       console.log("intialization error ",err)
//     }
  
//     return () => {
//       if (zegoEngine) {
//         zegoEngine?.logoutRoom("call_room");
//         ZegoExpressEngine?.destroyEngine();
//         zegoEngine = null;
//       }
//     };
//   }, []);

//   const sendCallRequest = async () => {
//     if (!targetUserID) {
//       return Alert.alert("Enter a valid User ID");
//     }

//     try {
//       // Ensure engine is available before calling
//       if (!zegoEngine) {
//         zegoEngine = ZegoExpressEngine?.createEngine(APP_ID, APP_SIGN, true);
//       }
//       console.log("zegoEngine ===>", zegoEngine)
//       const res = await zegoEngine?.sendCustomCommand("call_room", [{ userID: targetUserID, userName: "Receiver" }], "CALL_REQUEST");
//       Alert.alert("Call Sent", `Calling ${targetUserID}...`);
//     } catch (error) {
//       console.error("Error sending call request:", error);
//     }
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text style={{ fontSize: 18, fontWeight: 'bold' }}>User: {userID}</Text>
//       <TextInput
//         placeholder="Enter User ID to Call"
//         style={{ borderWidth: 1, width: 200, marginVertical: 10, padding: 5 }}
//         onChangeText={setTargetUserID}
//       />
//       <Button title="Call" onPress={sendCallRequest} />
//     </View>
//   );
// }

import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import {
  ZegoUIKitPrebuiltCallInvitationService,
  ZegoUIKitPrebuiltCallConfig,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import { ZegoUIKitSignalingPlugin } from '@zegocloud/zego-uikit-signaling-plugin-rn';

// Replace with your ZegoCloud credentials
// const APP_ID = 35360537;
// const APP_SIGN = "610c5c912e00881ffae2badaa85fff1c1ee8d7a91c92ccf54cd0d39ec19edcf8"
const appID = 35360537;
const appSign = '610c5c912e00881ffae2badaa85fff1c1ee8d7a91c92ccf54cd0d39ec19edcf8';

// Replace with actual user details
const currentUserID = "user_123";
const currentUserName = "John Doe";

const App = () => {
  useEffect(() => {
    initZego();
  }, []);

  const initZego = async () => {
    await ZegoUIKitPrebuiltCallInvitationService.init({
      appID: appID,
      appSign: appSign,
      userID: currentUserID,
      userName: currentUserName,
      notifyWhenAppRunningInBackgroundOrQuit: true,
      androidNotificationConfig: {
        channelID: "ZegoUIKit",
        channelName: "Call Notifications",
        sound: "notification",
        icon: "notification_icon",
      },
      iOSNotificationConfig: {
        isSandboxEnvironment: false,
        systemCallingIconName: 'CallKitIcon',
      },
      plugins: [ZegoUIKitSignalingPlugin()],
      requireConfig: (data) => {
        const config =
          data.invitees.length > 1
            ? data.type === "videoCall"
              ? ZegoUIKitPrebuiltCallConfig.groupVideoCall()
              : ZegoUIKitPrebuiltCallConfig.groupVoiceCall()
            : data.type === "videoCall"
            ? ZegoUIKitPrebuiltCallConfig.oneOnOneVideoCall()
            : ZegoUIKitPrebuiltCallConfig.oneOnOneVoiceCall();

        config.topMenuBarConfig.isVisible = true;
        config.topMenuBarConfig.buttons.unshift("minimizingButton");

        return config;
      },
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>React Native Zego Call</Text>
    </View>
  );
};

export default App;
