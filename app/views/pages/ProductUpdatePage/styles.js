import {
  StyleSheet,
} from 'react-native';
import * as commonStyles from '@common/styles/commonStyles';
import * as commonColors from '@common/styles/commonColors';
import { tabBarHieght } from '@common/styles/commonStyles';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: commonStyles.screenNormalHeight,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  videoView: {
    width: commonStyles.screenWidth,
    height: 200,
    backgroundColor: commonColors.darkGrayColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    fontSize: 50,
    color: 'white',
  },
  videoThumbnail: {
    width: '100%',
    height: '100%',
  },
  textTitle: {
    fontFamily: commonStyles.normalFont,
    fontWeight: 'bold',
    fontSize: commonStyles.normalFontSize,
    textAlign: 'right',
    color: commonColors.darkGrayColor,
    marginBottom: 3,
    backgroundColor: 'transparent'
  },
  textDescription: {
    fontFamily: commonStyles.normalFont,
    fontSize: commonStyles.normalFontSize,
    color: commonColors.placeholderText,
    textAlign: 'right'
  },
  bold: {
    fontFamily: commonStyles.normalFont,
    fontWeight: 'bold',
  },
  itemView: {
    width: commonStyles.screenWidth,
    borderBottomWidth: 0.5,
    borderColor: commonColors.borderColor,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: commonStyles.padding,
    marginVertical: 5,
    paddingVertical: 10,
  },
  productOptionView: {
    width: commonStyles.screenWidth,
    borderBottomWidth: 0.5,
    borderColor: commonColors.borderColor,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: commonStyles.padding,
    marginVertical: 5,
    paddingVertical: 10,
    flexDirection: 'row',
  },
  radioGroup: {
    flexDirection: 'row',
  },
  previewBtnView: {
    marginVertical: 40,
    height: commonStyles.buttonHeight,
    backgroundColor: commonColors.pinkColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textPreview: {
    fontFamily: commonStyles.normalFont,
    fontSize: commonStyles.normalFontSize,
    color: 'white',
  },
  input: {
    fontFamily: commonStyles.normalFont,
    width: '100%',
    fontSize: commonStyles.normalFontSize,
    color: commonColors.placeholderText,
  },
  underline: {
    textDecorationLine: 'underline',
    color: commonColors.greenColor
  },
  icon: {
    marginBottom: 10,
  },
  input: {
    fontFamily: commonStyles.normalFont,
    fontWeight: 'bold',
    width: '100%',
    fontSize: 20,
    color: commonColors.placeholderText,
    textAlign: 'right',
  },
  linebar: {
    color: commonColors.placeholderText,
    marginHorizontal: 10,
    fontSize: 30,
  },
  deleteVideo: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 60,
    height: 60,
  },
  deleteVideoInner: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteVideoIcon: {
    fontSize: 30,
    color: 'white',
    backgroundColor: 'transparent',
  },
  showVideo: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 60,
    height: 60,
  },
  addressView: {
    marginTop: 5,
  },
  buttonStyle: {
    height: commonStyles.buttonHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editBtnView: {
    backgroundColor: commonColors.pinkColor,
    marginTop: 30,
    marginBottom: 10,
  },
  deleteBtnView: {
    backgroundColor: commonColors.darkGrayColor,
    marginBottom: 30,
  },
  textEdit: {
    fontFamily: commonStyles.normalFont,
    fontSize: commonStyles.normalFontSize,
    color: 'white',
  },
});