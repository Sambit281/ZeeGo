import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import CallInvitationManager from '../../services/CallInvitationManager';

const IncomingCallScreen = ({ route, navigation }) => {
  const { requestID } = route.params;

  const acceptCall = async () => {
    await CallInvitationManager.getInstance().acceptCall(requestID);
    navigation.replace('CallScreen', { requestID });
  };

  const rejectCall = async () => {
    await CallInvitationManager.getInstance().rejectCall(requestID);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Incoming Call...</Text>
      <Button title="Accept" onPress={acceptCall} />
      <Button title="Reject" onPress={rejectCall} color="red" />
    </View>
  );
};

export default IncomingCallScreen;
