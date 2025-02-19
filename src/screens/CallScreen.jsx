import React, { useEffect } from 'react';
import { View, Button } from 'react-native';
import ZEGOSDKManager from '../../services/ZEGOSDKManager';

const CallScreen = ({ route, navigation }) => {
  const { requestID } = route.params;

  useEffect(() => {
    const engine = ZEGOSDKManager.getInstance().getZegoEngine();
    engine.startPublishingStream(requestID);
    engine.startPlayingStream(requestID);

    return () => {
      engine.stopPublishingStream(requestID);
      engine.stopPlayingStream(requestID);
    };
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="End Call" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default CallScreen;
