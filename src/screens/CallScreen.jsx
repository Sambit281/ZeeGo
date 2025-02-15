import React, { useEffect } from 'react';
import { View } from 'react-native';
import { ZegoUIKitPrebuiltCall, ZegoUIKitPrebuiltCallService } from '@zegocloud/zego-uikit-prebuilt-call-rn';

const APP_ID = 123456789; // Replace with your ZegoCloud AppID
const APP_SIGN = "your_app_sign_here"; // Replace with your AppSign

export default function CallScreen({ route, navigation }) {
  const { callerID } = route.params;
  const userID = Math.floor(Math.random() * 10000).toString();

  useEffect(() => {
    ZegoUIKitPrebuiltCallService.init({
      appID: APP_ID,
      appSign: APP_SIGN,
      userID,
      userName: `User_${userID}`,
    });

    return () => ZegoUIKitPrebuiltCallService.uninit();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ZegoUIKitPrebuiltCall
        appID={APP_ID}
        appSign={APP_SIGN}
        userID={userID}
        userName={`User_${userID}`}
        callID={callerID}
        onHangUp={() => navigation.goBack()}
      />
    </View>
  );
}
