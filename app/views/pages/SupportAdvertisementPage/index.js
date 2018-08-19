import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  ListView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import KeyboardScrollView from '@components/KeyboardView';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import I18n from '@i18n';
import Container from '@layout/Container';
import DropdownComponent from '@components/DropdownComponent';

import { styles } from './styles';
import * as commonStyles from '@common/styles/commonStyles';
import * as commonColors from '@common/styles/commonColors';
import { sendAdvertisement, getAdSubject } from '@redux/Message/actions';
import LoadingSpinner from '@components/LoadingSpinner';
import CustomAlert from '@components/CustomAlert';

class SupportAdvertisementPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      email: '',
      fullName: '',
      telephone: '',
      subject: '',
      message: '',
      loading: false,
      isSuccess: false,
      successMsg: '',
      subjectList: [],
    }
  }

  componentWillMount() {
    const { user, token, getAdSubject } = this.props;

    if (user.userInfo) {
      const userInfo = user.userInfo.user
      this.setState({
        fullName: `${userInfo.firstname} ${userInfo.lastname}`,
        email: userInfo.email,
        telephone: userInfo.telephone,
      })
    }

    this.setState({ loading: true });
    getAdSubject(token.tokenInfo.token)
  }

  componentWillReceiveProps(nextProps) {
    const { message } = nextProps;

    if (this.props.message.status === 'GET_AD_SUBJECT_REQUEST' && message.status === 'GET_AD_SUBJECT_SUCCESS') {
      this.setState({ loading: false });
      if (message.adSubjectList.status === 200) {
        let data = message.adSubjectList.subjects;
        let subjectList = []
        for (let i = 0; i < data.length; i ++) {
          subjectList[i] = {value: data[i]['name']}
        }
        this.setState({ subjectList });
      }
    }

    if (this.props.message.status === 'SEND_AD_REQUEST' && message.status === 'SEND_AD_SUCCESS') {
      this.setState({ loading: false });
      if (message.advertisementData.status === 200) {
        this.setState({ isSuccess: true, successMsg: message.advertisementData.message });
      }
    }
  }

  onSend() {
    const { token, sendAdvertisement } = this.props;
    this.setState({ loading: true });
    sendAdvertisement(
      token.tokenInfo.token,
      {
        full_name: this.state.fullName,
        mobile_no: this.state.telephone,
        email_id: this.state.email,
        subject: this.state.subject,
        message: this.state.message,
      }
    )
  }

  closeAlert() {
    this.setState({ isSuccess: false });
  }

  render() {
    const { loading, isSuccess, successMsg, tabIndex, subjectList } = this.state;

    return (
      <Container title={I18n.t('sidebar.support_advertisement')}>
        <LoadingSpinner visible={loading } />
        <CustomAlert 
          title={'Success'}
          message={successMsg}
          visible={isSuccess} 
          closeAlert={() => this.closeAlert()}
        />

        <View style={styles.container}>
          <KeyboardScrollView>
            <View style={styles.fieldContainer}>
              <View style={styles.inputView}>
                <TextInput
                  ref="fullName"
                  autoCapitalize="none"
                  autoCorrect
                  placeholder={I18n.t('profile.ph_name')}
                  placeholderTextColor={commonColors.placeholderSubText}
                  textAlign="right"
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  returnKeyType={'next'}
                  value={this.state.fullName}
                  onChangeText={text => this.setState({ fullName: text })}
                  onSubmitEditing={() => this.refs.mobileNumber.focus()}
                />
                <View style={styles.iconView}>
                  <Icon name='user' style={styles.inputIcon}></Icon>
                </View>
              </View>

              <View style={styles.inputView}>
                <TextInput
                  ref="mobileNumber"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder={I18n.t('profile.ph_mobile_number')}
                  placeholderTextColor={commonColors.placeholderSubText}
                  textAlign="right"
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  returnKeyType={'next'}
                  keyboardType="numbers-and-punctuation"
                  value={this.state.telephone}
                  onChangeText={text => this.setState({ telephone: text }) }
                  onSubmitEditing={() => this.refs.email.focus()}
                />
                <View style={styles.iconView}>
                  <Icon name='screen-tablet' style={styles.inputIcon}></Icon>
                </View>
              </View>

              <View style={styles.inputView}>
                <TextInput
                  ref="email"
                  autoCapitalize="none"
                  autoCorrect={ false }
                  placeholder={I18n.t('profile.ph_email')}
                  placeholderTextColor={commonColors.placeholderSubText}
                  textAlign="right"
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  returnKeyType={'next'}
                  keyboardType="email-address"
                  value={this.state.email}
                  onChangeText={text => this.setState({ email: text })}
                  onSubmitEditing={() => this.refs.message.focus()}
                />
                <View style={styles.iconView}>
                  <Icon name='envelope' style={styles.inputIcon}></Icon>
                </View>
              </View>

              <View style={styles.itemView}>
                <Text style={styles.textTitle}>{I18n.t('support.subject')}</Text>
                <DropdownComponent
                  selectItem={value => this.setState({ subject: value })}
                  item={this.state.subject}
                  data={subjectList}
                />
              </View>

              <View style={styles.itemView}>
                <Text style={styles.textTitle}>{I18n.t('support.message')}</Text>
                <TextInput
                  ref="message"
                  multiline
                  autoCapitalize="none"
                  autoCorrect
                  placeholder={I18n.t('support.ph_message')}
                  placeholderTextColor={commonColors.placeholderSubText}
                  textAlign="right"
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  returnKeyType={'next'}
                  value={this.state.message}
                  onChangeText={text => this.setState({ message: text })}
                />
              </View>
            </View>
          </KeyboardScrollView>

          <View style={styles.btnView}>
            <TouchableOpacity onPress={() => this.onSend()} activeOpacity={0.5}>
              <View style={styles.btnWrapper}>
                <Text style={styles.btnText}>{I18n.t('send')}</Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>
      </Container>
    );
  }
}

const mapStateToProps = ({ user, token, message }) => ({
  user,
  token,
  message
})

const mapDispatchToProps = dispatch => ({
  sendAdvertisement: (token, data) => dispatch(sendAdvertisement(token, data)),
  getAdSubject: (token) => dispatch(getAdSubject(token)),
})

SupportAdvertisementPage.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  token: PropTypes.objectOf(PropTypes.any).isRequired,
  message: PropTypes.objectOf(PropTypes.any).isRequired,
  sendAdvertisement: PropTypes.func.isRequired,
  getAdSubject: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SupportAdvertisementPage)
