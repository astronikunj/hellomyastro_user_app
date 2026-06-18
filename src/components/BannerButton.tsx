import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface TriangleProps {
  height: number;
}

const LeftTriangle = ({ height }: TriangleProps) => {
  // Triangle height should match container height
  const triangleHeight = height || windowHeight * 0.05; // Default to 5% of screen height
  const triangleWidth = 15;

  return (
    <View style={[
      styles.leftTriangle,
      {
        borderLeftWidth: triangleWidth,
        borderTopWidth: triangleHeight / 2,
        borderBottomWidth: triangleHeight / 2,
      },
    ]} />
  );
};

const RightTriangle = ({ height }: TriangleProps) => {
  const triangleHeight = height || windowHeight * 0.05;
  const triangleWidth = 15;

  return (
    <View style={[
      styles.rightTriangle,
      {
        borderRightWidth: triangleWidth,
        borderTopWidth: triangleHeight / 2,
        borderBottomWidth: triangleHeight / 2,
      },
    ]} />
  );
};

interface BannerButtonProps {
  onPress: () => void;
}

const BannerButton = ({ onPress }: BannerButtonProps) => {
  const containerHeight = windowHeight * 0.05; // 5% of screen height

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.container, { height: containerHeight }]}>
        <LeftTriangle height={containerHeight} />
        <RightTriangle height={containerHeight} />
        <Text style={styles.text}>First Chat Free on Signup</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: windowWidth * 0.02, // 2% of screen width
    backgroundColor: '#ef4e5e',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Needed for absolute positioning of children
  },
  text: {
    color: 'white',
    fontSize: windowWidth * 0.04, // Approximate 17.sp equivalent
    fontWeight: '400',
  },
  leftTriangle: {
    position: 'absolute',
    left: -2,
    borderLeftColor: '#ef4e5e',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderStyle: 'solid',
  },
  rightTriangle: {
    position: 'absolute',
    right: -2,
    borderRightColor: '#ef4e5e',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderStyle: 'solid',
  },
});

export default BannerButton;
