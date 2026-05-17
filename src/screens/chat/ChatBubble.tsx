import { Fonts } from '@/assets';
import React from 'react';
import { View, Text } from 'react-native';

interface Props {
  message: string;
  isSelf: boolean;
  time?: string;
}

const ChatMessageBubble = ({ message, isSelf, time }: Props) => {
  return (
    <View
      style={{
        alignSelf: isSelf ? 'flex-end' : 'flex-start',
        backgroundColor: isSelf ? '#dcf8c6' : 'white',
        margin: 5,
        padding: 10,
        borderRadius: 10,
        maxWidth: '80%',
        elevation: 1,
      }}
    >
      <Text style={{ fontSize: 16, fontFamily: Fonts.regular, includeFontPadding: false, color: '#0d0d0d' }}>{message}</Text>
      {time && (
        <Text style={{ fontSize: 10, textAlign: 'right', color: '#666', fontFamily: Fonts.regular, includeFontPadding: false }}>
          {time}
        </Text>
      )}
    </View>
  );
};

export default ChatMessageBubble;
