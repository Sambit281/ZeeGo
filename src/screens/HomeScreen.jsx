import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import CallInvitationManager from '../../services/CallInvitationManager';

const OutgoingCallScreen = ({ route, navigation }) => {
  const { userIDs, isVideoCall } = route.params;

  useEffect(() => {
    CallInvitationManager.getInstance().sendCallInvite(userIDs, isVideoCall)
      .then((requestID) => {
        console.log('Call invitation sent:', requestID);
      })
      .catch((error) => {
        console.error('Call invitation failed:', error);
        navigation.goBack();
      });
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Calling...</Text>
      <Button title="Cancel Call" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default OutgoingCallScreen;
