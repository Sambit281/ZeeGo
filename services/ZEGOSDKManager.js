import { ZegoExpressEngine } from 'zego-express-engine-reactnative';
import {ZIM} from 'zego-zim-react-native';

class ZEGOSDKManager {
  static instance;

  static getInstance() {
    if (!ZEGOSDKManager.instance) {
      ZEGOSDKManager.instance = new ZEGOSDKManager();
    }
    return ZEGOSDKManager.instance;
  }

  constructor() {
    this.zegoEngine = null;
    this.zim = null;
  }

  async initSDK(appID, appSign, scenario) {
    try {
      console.log('Initializing ZegoExpressEngine...');
      this.zegoEngine = await ZegoExpressEngine?.createEngine(
        appID,
        appSign,
        true, // isTestEnv
        scenario || 0
      );
      console.log('ZegoExpressEngine initialized successfully');

      console.log('Initializing ZIM...');
      this.zim = ZIM?.create({ appID, appSign });
      if (!this.zim) {
        throw new Error('Failed to create ZIM instance');
      }
      console.log('ZIM initialized successfully');

      const userID = Math.floor(Math.random() * 1000000).toString();
      await this.zim.login({
        userID,
        userName: `User_${userID}`,
      });
      console.log('Logged in to ZIM successfully');

      await this.zegoEngine.enableAudioCaptureDevice(true);
      console.log('Audio capture device enabled');

      return true;
    } catch (error) {
      console.error('Failed to initialize SDK:', error);
      throw error;
    }
  }

  async destroySDK() {
    try {
      if (this.zegoEngine) {
        await this.zegoEngine.destroyEngine();
        this.zegoEngine = null;
      }
      if (this.zim) {
        ZIM.destroy();
        this.zim = null;
      }
    } catch (error) {
      console.error('Error destroying SDK:', error);
    }
  }

  getZegoEngine() {
    if (!this.zegoEngine) {
      throw new Error('ZegoExpressEngine not initialized');
    }
    return this.zegoEngine;
  }

  getZIM() {
    if (!this.zim) {
      throw new Error('ZIM not initialized');
    }
    return this.zim;
  }
}

export default ZEGOSDKManager;