// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { View, Text, Button, PermissionsAndroid, Platform } from 'react-native';
import RtcEngine, { ChannelProfile, ClientRole } from 'react-native-agora';

const APP_ID = 'c291f42b6332484f8c1ff9125dc2b9ea';
const TOKEN = 'YOUR_TEMP_TOKEN';
const CHANNEL_NAME = 'testchannel';

const requestAudioPermission = async () => {
  if (Platform.OS === 'android') {
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
  }
};

const AudioCallScreen = () => {
  const [engine, setEngine] = useState<RtcEngine | null>(null);
  const [joined, setJoined] = useState(false);
  const [mute, setMute] = useState(false);

  useEffect(() => {
    const init = async () => {
      await requestAudioPermission();
      const rtcEngine = await RtcEngine.create(APP_ID);
      setEngine(rtcEngine);

      await rtcEngine.setChannelProfile(ChannelProfile.Communication);
      await rtcEngine.setClientRole(ClientRole.Broadcaster);

      rtcEngine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
        console.log('Joined', channel, uid);
        setJoined(true);
      });

      rtcEngine.addListener('UserJoined', (uid) => {
        console.log('Remote user joined:', uid);
      });

      rtcEngine.addListener('UserOffline', (uid) => {
        console.log('Remote user left:', uid);
      });
    };

    init();

    return () => {
      engine?.destroy();
    };
  }, []);

  const joinChannel = async () => {
    await engine?.joinChannel(TOKEN, CHANNEL_NAME, null, 0);
  };

  const leaveChannel = async () => {
    await engine?.leaveChannel();
    setJoined(false);
  };

  const toggleMute = async () => {
    await engine?.muteLocalAudioStream(!mute);
    setMute(!mute);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18 }}>Agora Audio Call</Text>
      {joined ? (
        <>
          <Button title={mute ? 'Unmute' : 'Mute'} onPress={toggleMute} />
          <Button title="Leave Call" onPress={leaveChannel} color="red" />
        </>
      ) : (
        <Button title="Join Call" onPress={joinChannel} />
      )}
    </View>
  );
};

export default AudioCallScreen;
