import {
  StyleSheet,
} from 'react-native';
import * as COMMON_STYLES from '@common/styles/commonStyles';
import * as COMMON_COLORS from '@common/styles/commonColors';

const listItemWidth = (COMMON_STYLES.SCREEN_WIDTH - COMMON_STYLES.PADDING * 2 - 15) / 2;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: COMMON_STYLES.SCREEN_NORMAL_HEIGHT,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 10,
  },
  listView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 15,
    paddingHorizontal: COMMON_STYLES.PADDING - 7.5,
  },
  listItem: {
    width: listItemWidth,
    marginHorizontal: 7.5,
    marginBottom: 15,
    shadowOffset: { width:0, height:2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 1,
    shadowColor: 'black',
  },
  imageView: {
    width: '100%',
    height: listItemWidth,
    backgroundColor: '#E9E9E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundContent: {
    width: '75%',
    height: '75%',
    borderRadius: listItemWidth/2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    fontWeight: 'bold',
    fontSize: 25,
    color: 'white',
    fontStyle: 'italic',
    backgroundColor: 'transparent',
  },
  day: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    fontWeight: 'bold',
    fontSize: 12,
    color: 'white',
    fontStyle: 'italic',
    backgroundColor: 'transparent',
    flexWrap: 'wrap',
  },
  footerView: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#747474',
  },
  textTitle: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    fontWeight: 'bold',
    color: 'white',
    fontSize: 25,
  },
  paidPackgeText: {
    fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY,
    color: COMMON_COLORS.GREEN_COLOR,
    fontSize: 16
  }
});