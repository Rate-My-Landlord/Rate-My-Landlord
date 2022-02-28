import { Dimensions, useWindowDimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

// The point at which style changes
export const screenChangePoint: number = 1000;

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
};
