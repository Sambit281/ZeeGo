class CallInvitationManager {
  static instance;

  static getInstance() {
    if (!CallInvitationManager.instance) {
      CallInvitationManager.instance = new CallInvitationManager();
    }
    return CallInvitationManager.instance;
  }

  async sendCallInvite(userIDs, isVideoCall) {
    try {
      const zim = ZEGOSDKManager.getInstance().getZIM();

      if (!zim) {
        throw new Error('ZIM not initialized - call initSDK first');
      }
  
      const extendedData = JSON.stringify({
        type: isVideoCall ? 10000 : 10001, // VIDEO_CALL or VOICE_CALL
      });

      const config = {
        extendedData,
        mode: 1, // Advanced mode
      };

      return new Promise((resolve, reject) => {
        zim.sendCallInvite(userIDs, config, (requestID, errorInfo) => {
          if (errorInfo.code === 0) {
            resolve(requestID);
          } else {
            reject(errorInfo);
          }
        });
      });
    } catch (error) {
      console.error('Error in sendCallInvite:', error);
      throw error;
    }
  }

  async acceptCall(requestID) {
    try {
      const zim = ZEGOSDKManager.getInstance().getZIM();
      
      return new Promise((resolve, reject) => {
        zim.acceptCallInvite(requestID, {}, (errorInfo) => {
          if (errorInfo.code === 0) {
            resolve();
          } else {
            reject(errorInfo);
          }
        });
      });
    } catch (error) {
      console.error('Error in acceptCall:', error);
      throw error;
    }
  }

  async rejectCall(requestID) {
    try {
      const zim = ZEGOSDKManager.getInstance().getZIM();
      
      return new Promise((resolve, reject) => {
        zim.rejectCallInvite(requestID, {}, (errorInfo) => {
          if (errorInfo.code === 0) {
            resolve();
          } else {
            reject(errorInfo);
          }
        });
      });
    } catch (error) {
      console.error('Error in rejectCall:', error);
      throw error;
    }
  }
}

export default CallInvitationManager;