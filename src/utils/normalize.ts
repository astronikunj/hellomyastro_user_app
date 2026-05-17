import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

// Reference screen dimensions (iPhone 6)
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 667;

const scale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const normalize = (size: number, based = 'width', factor = 0.5) => {
  const newSize =
    based === 'height' ? verticalScale(size) : moderateScale(size, factor);

  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export { scale, verticalScale, moderateScale, normalize };
