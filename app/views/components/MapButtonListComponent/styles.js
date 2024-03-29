import {
  StyleSheet,
} from 'react-native';
import * as COMMON_COLORS from '@common/styles/commonColors';

export const styles = StyleSheet.create({
  btn: {
    position: 'absolute',
    right: 2,
    zIndex: 99,
  },
  btnIcon: {
    width: 73,
    height: 73,
  },
  badgeView: {
    position: 'absolute',
    right: 5,
    top: 0,
    width: 25,
    height: 25,
    backgroundColor: COMMON_COLORS.PINK_COLOR,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    backgroundColor: 'transparent',
  }
});