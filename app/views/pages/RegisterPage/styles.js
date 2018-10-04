import {
  StyleSheet,
} from 'react-native';
import * as commonStyles from '@common/styles/commonStyles';
import * as commonColors from '@common/styles/commonColors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  tabBar: {
    width: commonStyles.screenWidth,
    height: commonStyles.tabBarHieght,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  tbnWrapper: {
    width: '50%',
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  tabText: {
    fontFamily: commonStyles.normalFont,
    color: 'white',
    fontSize: commonStyles.normalFontSize,
  },
  loginContainer: {
    height: commonStyles.screenSubHeight,
    width: '100%',
  },
  btnView: {
    width: '100%',
    height: commonStyles.buttonHeight,
    backgroundColor: commonColors.greenColor,
    bottom: 0,
    position: 'absolute',
  },
  btnViewLogin: {
    width: '100%',
    height: commonStyles.buttonHeight,
    backgroundColor: commonColors.greenColor,
    marginTop: 20,
  },
  btnWrapper: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontFamily: commonStyles.normalFont,
    color: 'white',
    fontSize: commonStyles.normalFontSize,
  },
  fieldContainer: {
    width: commonStyles.screenWidth,
    paddingHorizontal: commonStyles.padding,
    justifyContent:'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  fieldContainerLogin: {
    height: commonStyles.screenSubHeight - 200,
    justifyContent:'center',
    alignItems: 'center',
    width: commonStyles.screenWidth,
    paddingHorizontal: commonStyles.padding
  },
  inputView: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderColor: commonColors.borderColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: commonStyles.padding,
    height: 50,
  },
  input: {
    fontFamily: commonStyles.normalFont,
    color: commonColors.darkGrayColor,
    width: commonStyles.screenSubWidth - 60,
    fontSize: 20,
    paddingRight: 20
  },
  iconView: {
    width: 50,
    alignItems: 'flex-start',
  },
  inputIcon: {
    color: '#EC33AA',
    fontSize: 25,
  },
  forgotPasswordView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: commonStyles.padding,
    height: 50,
  },
  forgotPasswordText: {
    fontFamily: commonStyles.normalFont,
    color: commonColors.placeholderText,
    fontSize: commonStyles.normalFontSize,
    fontStyle: 'italic',
  },
  wizard: {
    width: '100%',
    marginVertical: 20,
  }
});

export const wizardStyle = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize:30,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 5,
  separatorFinishedColor: '#4aae4f',
  separatorUnFinishedColor: '#a4d4a5',
  stepIndicatorFinishedColor: '#4aae4f',
  stepIndicatorUnFinishedColor: '#a4d4a5',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: '#000000',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
  labelColor: '#666666',
  labelSize: 12,
  currentStepLabelColor: '#4aae4f'
}