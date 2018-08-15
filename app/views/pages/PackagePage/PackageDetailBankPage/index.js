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
  Platform,
} from 'react-native';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import FontAwesome, {Icons} from 'react-native-fontawesome';
import KeyboardScrollView from '@components/KeyboardView';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import DatePicker from 'react-native-datepicker';
import LoadingSpinner from '@components/LoadingSpinner';
const img_detail = require('@common/assets/images/my_message/picture.png');

import { getBankDetail, sendBankDetail } from '@redux/Package/actions'
import I18n from '@i18n';
import Container from '@layout/Container';
import { styles } from './styles';
import * as commonStyles from '@common/styles/commonStyles';
import * as commonColors from '@common/styles/commonColors';

class PackageDetailBankPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bankInfo: [],
      bankData: {},
      loading: false
    }
  }

  componentWillMount() {
    const { token } = this.props
    this.setState({ loading: true })
    this.props.getBankDetail(token.tokenInfo.token)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.packages.status === 'GET_BANK_DETAIL_REQUEST' && nextProps.packages.status === 'GET_BANK_DETAIL_SUCCESS') {
      const { bankInfo } = nextProps.packages
      console.log('BANK_INFO: ', bankInfo)
      this.setState({ loading: false })
      this.setState({ bankInfo, bankData: bankInfo.length > 0 ? bankInfo[0] : {} })
    }
  }

  onTry = () => {
    const { user, token } = this.props
    const { bankData: { bank_id } } = this.state
    const user_id = user.userInfo.user.customer_id
    const param = {
      user_id,
      bank_id
    }
    this.props.sendBankDetail(token.tokenInfo.token, param)
  }

  onChange = (index) => {
    const { bankInfo } = this.state
		this.setState({ bankData: bankInfo[index] });
  }

  render() {
    const { data } = this.props
    const { bankData } = this.state

    
    return (
      <Container title={data.detail['1'].title} type='detail'>
        <View style={styles.container}>
          <LoadingSpinner visible={this.state.loading } />

          <Image source={img_detail} style={styles.thumbnail} />

          <View style={styles.fieldContainer}>
          {!isEmpty(bankData) && (
            <KeyboardScrollView>
                <View style={styles.titleView}>
                  <Text style={styles.textTitle}>
                    {I18n.t('packages.company_name')}
                  </Text>
                  <Text style={styles.textDescription}>
                    {bankData.company_name}
                  </Text>
                </View>
                
                <View style={styles.titleView}>
                  <Text style={styles.textTitle}>
                    {I18n.t('packages.bank_number')}
                  </Text>
                  <Text style={styles.textDescription}>
                    {bankData.iban}
                  </Text>
                </View>

                <View style={styles.titleView}>
                  <Text style={styles.textTitle}>
                    {I18n.t('packages.account_number')}
                  </Text>
                  <Text style={styles.textDescription}>
                    {bankData.account_no}
                  </Text>
                </View>

                <View style={styles.titleView}>
                  <Text style={styles.textTitle}>
                    {I18n.t('post_video.location')}
                  </Text>
                  <Text style={styles.textDescription}>
                    {bankData.address}
                  </Text>
                </View>
            </KeyboardScrollView>
            )}
          </View>

          <View style={styles.btnView}>
            <TouchableOpacity onPress={() => this.onTry()} activeOpacity={0.5}>
              <View style={styles.btnWrapper}>
                <Text style={styles.btnText}>{I18n.t('packages.try')}</Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>
      </Container>
    );
  }
}

const mapStateToProps = ({ user, token, packages }) => ({
  user,
  token,
  packages
})

const mapDispatchToProps = dispatch => ({
  getBankDetail: (token) => dispatch(getBankDetail(token)),
  sendBankDetail: (token, data) => dispatch(sendBankDetail(token, data))
})

PackageDetailBankPage.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  token: PropTypes.objectOf(PropTypes.any).isRequired,
  packages: PropTypes.objectOf(PropTypes.any),
  getBankDetail: PropTypes.func.isRequired,
  sendBankDetail: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PackageDetailBankPage)
