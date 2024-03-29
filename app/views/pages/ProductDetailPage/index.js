import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Share,
  ScrollView,
  ActivityIndicator,
  TextInput
} from 'react-native';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import Video from 'react-native-video';
import FontAwesome, {Icons} from 'react-native-fontawesome';
import Icon from 'react-native-vector-icons/Feather';
import IconEntypo from 'react-native-vector-icons/Entypo';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Modal from 'react-native-modal'
import _ from 'lodash'
import call from 'react-native-phone-call'
import CustomAlert from '@components/CustomAlert';

import I18n from '@i18n';
import Container from '@layout/Container';
import { CATEGORY_ICON_LIST } from '@common/category';
import { PRICE_FORMAT, PERIOD_DATA, BUILDING_TYPE_DATA, APARTMENT_ROOM_TYPE } from '@common';

import { setFavorite, addViewCount, sendReport } from '@redux/Product/actions';

import * as COMMON_STYLES from '@common/styles/commonStyles';
import * as COMMON_COLORS from '@common/styles/commonColors';
import { styles } from './styles';

const ASPECT_RATIO = COMMON_STYLES.SCREEN_SUB_WIDTH / 200
const LATITUDE_DELTA = 0.1222;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const ICON_REPORT = require('@common/assets/images/product_detail/report_ad.png');

class ProductDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: true,
      opacity: 0,
      reportModal: false,
      reportMessage: '',
      isSuccess: false
    }
  }

  componentWillMount() {
    const { data, user, token, addViewCount } = this.props

    this.setState({ favorite: data.favorite })

    if (user.userLogin && data.customer_id !== user.userInfo.user.customer_id) {
      addViewCount(token.tokenInfo.token, { product_id: data.product_id, user_id: user.userInfo.user.customer_id })
    }
  }

  componentWillReceiveProps(nextProps) {
    const { products } = nextProps

    if (this.props.products.loading === 'SET_FAVORITE_REQUEST' && products.loading === 'SET_FAVORITE_SUCCESS') {
      Actions.MyWishList()
    }

    if (this.props.products.loading === 'SEND_REPORT_REQUEST' && products.loading === 'SEND_REPORT_SUCCESS') {
      this.setState({ reportMessage: '', isSuccess: true })
    }
  }

  onFavorite() {
    const {
      data,
      token,
      user,
      setFavorite,
    } = this.props

    const { favorite } = this.state

    this.setState({ favorite: !favorite })

    setFavorite(
      token.tokenInfo.token,
      {
        customer_id: user.userInfo.user.customer_id,
        product_id: data.product_id
      },
      favorite,
    )
  }

  onShare() {
    const { data } = this.props;

    Share.share({
      message: data.description,
      url: data.video_url,
      title: data.name
    }, {
      dialogTitle: 'AQAR Videos',
      subject: 'AQAR Videos'
    })
  }

  onSendMessage() {
    const { data: { product_id, customer_id } } = this.props;

    Actions.DirectMessage({
      product_id,
      product_owner_id: customer_id,
    });
  }

  onReportAD = () => {
    this.setState({ reportModal: true })
  }

  onSendReport = () => {
    const { data, user, token, sendReport } = this.props

    if (this.state.reportMessage.length > 0) {
      const param = {
        product_id: data.product_id,
        user_id: user.userInfo.user.customer_id,
        description: this.state.reportMessage
      }

      this.setState({ reportModal: false }, () => {
        sendReport(token.tokenInfo.token, param)
      })
    }
  }

  onCamera() {
    this.player.presentFullscreenPlayer();
    this.player.seek(0);
  }

  onLoadStart = () => {
    this.setState({ opacity: 1 }, () => {
      this.player.presentFullscreenPlayer
    })
  }

  onLoad = () => {
    this.setState({ opacity: 0 })
  }

  onBuffer = ({ isBuffering }) => {
    this.setState({ opacity: isBuffering ? 1 : 0 })
  }

  onPhoneCall = () => {
    const number = _.split(this.props.data.telephone, '+')
    const args = {
      number: number[1],
      prompt: false
    }
    call(args).catch(console.error)
  }

  render() {
    const { data, user } = this.props;
    // console.log('DETAIL_DATA: ', data)

    return (
      <Container title="" type='detail'>
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.subContainer}>
              <View style={styles.videoView}>
                {(!!data.video_url && data.video_url.length > 0)
                  ? <TouchableOpacity onPress={() => this.onCamera()}>
                      <Video
                        ref={(ref) => { this.player = ref }}
                        source={{ uri: data.video_url }}
                        style={styles.video}
                        resizeMode='cover'
                        autoplay={false}
                        paused
                        onBuffer={this.onBuffer}
                        onLoad={this.onLoad}
                        onLoadStart={this.onLoadStart}
                      />
                    </TouchableOpacity>
                  : <Icon name='video-off' style={styles.emptyVideo} />
                }

                <ActivityIndicator
                  animating
                  size="large"
                  color="#fff"
                  style={{
                    opacity: this.state.opacity,
                    position: 'absolute',
                    top: 80,
                    left: COMMON_STYLES.SCREEN_WIDTH / 2 - 20,
                  }}
                />
              </View>
              
              <View style={styles.titleView}>
                <Text style={styles.textTitle}>
                  {data.name}
                </Text>
              </View>

              {data.description.length > 0 && (
                <View style={[styles.titleView, { marginVertical: 0 }]}>
                  <Text style={styles.textDescription}>
                    {data.description}
                  </Text>
                </View>
              )}

              {data.telephone && (
                <View style={[styles.titleView, { marginBottom: 0 }]}>
                  <TouchableOpacity onPress={() => this.onPhoneCall()}>
                    <Text style={styles.textPhone}>
                      {data.telephone}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              
              <View style={styles.separate} />
              
              <View style={styles.itemView}>
                <Text style={styles.textTitle}>
                  {`${PRICE_FORMAT(data.price)} ${I18n.t('sar')}`} 
                </Text>
              </View>

              {data.category === 'building' && (
                <View style={styles.itemView}>
                  <Text style={styles.textDescription}>
                    {BUILDING_TYPE_DATA[parseInt(data.building_type)].value}
                  </Text>
                </View>
              )}

              {(data.category === 'apartment') && (
                <View style={styles.itemView}>
                  <Text style={styles.textDescription}>
                    {PERIOD_DATA[parseInt(data.period)].value}
                  </Text>
                </View>
              )}

              {data.category === 'apartment' && (
                <View>
                  <View style={styles.itemView}>
                    <Text style={styles.textDescription}>
                      {APARTMENT_ROOM_TYPE[parseInt(data.room_type)].value}
                    </Text>
                  </View>
                  {(data.furniture || data.furniture === 'true') && (
                    <View style={styles.itemView}>
                      <Text style={styles.textDescription}>
                        {I18n.t('post_video.furniture')}
                      </Text>
                    </View>
                  )}
                </View>
              )}

              {data.category === 'gallery' && (
                <View>
                  <View style={styles.itemView}>
                    <Text style={styles.textDescription}>
                      {data.street_size}
                    </Text>
                  </View>
                </View>
              )}

              {(data.location !== null && data.location.length > 0) && (
                <View style={styles.itemView}>
                  <Text style={styles.textDescription}>
                    {data.location}
                  </Text>
                </View>
              )}
              
              <View style={styles.itemView}>
                <Text style={styles.textTitle}>
                  {data.product_type === '0' ? I18n.t('post_video.sale') : I18n.t('post_video.rent')}
                </Text>
              </View>

              <View style={styles.titleView}>
                <Image source={CATEGORY_ICON_LIST[data.category.toLowerCase()]} style={styles.iconCategory} resizeMode="contain" />
                <Text style={styles.textDescription}>
                  {I18n.t(`category.${data.category.toLowerCase()}`)}
                </Text>
              </View>
              
              {/* <View style={[styles.titleView, { marginTop: 20 }]}>
                <Text style={styles.textTitle}>
                  {data.location}
                </Text>
                <View style={styles.mapViewContainer}>
                  <MapView
                    style={styles.mapView}
                    showsScale
                    showsPointsOfInterest
                    showsBuildings
                    showsCompass
                    loadingEnabled
                    toolbarEnabled
                    pitchEnabled
                    zoomEnabled
                    rotateEnabled
                    initialRegion={{
                      latitude: parseFloat(data.latitude),
                      longitude: parseFloat(data.longitude),
                      latitudeDelta: LATITUDE_DELTA,
                      longitudeDelta: LONGITUDE_DELTA
                    }}
                  >
                    <MapView.Marker
                      coordinate={{
                        latitude: parseFloat(data.latitude),
                        longitude: parseFloat(data.longitude),
                      }}
                      title={data.title}
                    />
                  </MapView>
                </View>
              </View> */}

              {user.userLogin && data.customer_id !== user.userInfo.user.customer_id && (
                <View style={styles.separate} />
              )}

              {user.userLogin && data.customer_id !== user.userInfo.user.customer_id && (
                <View style={styles.btnView}>
                  <TouchableOpacity onPress={() => this.onFavorite()} activeOpacity={0.5}>
                    <View style={styles.btnFavorite}>
                      <View style={styles.sendTextWrapper}>
                        <Text style={styles.textSend}>{I18n.t('sidebar.add_to')}</Text>
                        <Text style={styles.textSend}>{(I18n.t('sidebar.my_wishlist')).toUpperCase()}</Text>
                      </View>
                      <FontAwesome style={this.state.favorite ? styles.icon_select : styles.icon}>{Icons.star}</FontAwesome>
                    </View>
                  </TouchableOpacity>
                  {/* <TouchableOpacity onPress={() => this.onShare()} activeOpacity={0.5}>
                    <View style={styles.btnShare}>
                      <IconEntypo name='share' style={styles.icon}></IconEntypo>
                    </View>
                  </TouchableOpacity> */}
                  <TouchableOpacity onPress={() => this.onSendMessage()} activeOpacity={0.5}>
                    <View style={styles.btnSend}>
                      <View style={styles.sendTextWrapper}>
                        <Text style={styles.textSend}>{I18n.t('send')}</Text>
                        <Text style={styles.textSend}>{I18n.t('message')}</Text>
                      </View>
                      <FontAwesome style={styles.icon}>{Icons.envelopeO}</FontAwesome>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              
              {user.userLogin && data.customer_id !== user.userInfo.user.customer_id && (
                <View style={styles.btnView}>
                  <TouchableOpacity onPress={() => this.onReportAD()} activeOpacity={0.5}>
                    <View style={styles.btnAd}>
                      <Text style={[styles.textDescription, { fontStyle: 'italic' }]}>{I18n.t('report_ad')}</Text>
                      <Image source={ICON_REPORT} style={styles.iconAd} />
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </View>

          </ScrollView>

          <Modal
            style={{ margin: 0 }}
            isVisible={this.state.reportModal}
            backdropOpacity={0.6}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            animationInTiming={500}
            onBackdropPress={() => this.setState({ reportModal: false, reportMessage: '' })}
          >
            <View style={styles.reportView}>
              <TextInput
                ref="message"
                multiline
                autoCapitalize="none"
                autoCorrect
                placeholder={I18n.t('support.ph_message')}
                placeholderTextColor={COMMON_COLORS.PLACEHOLDER_SUB_TEXT_COLOR}
                textAlign="right"
                style={styles.input}
                underlineColorAndroid="transparent"
                returnKeyType={'send'}
                value={this.state.reportMessage}
                onChangeText={text => this.setState({ reportMessage: text })}
                onSubmitEditing={() => this.onSendReport()}
              />
              <View style={styles.reportBtnView}>
                <TouchableOpacity onPress={() => this.onSendReport()} activeOpacity={0.5}>
                  <View style={styles.reportBtnWrapper}>
                    <Text style={styles.reportBtnText}>{I18n.t('send')}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>

        <CustomAlert 
          title={I18n.t('alert.success')}
          visible={this.state.isSuccess} 
          closeAlert={() => this.setState({ isSuccess: false })}
        />
      </Container>
    );
  }
}

const mapStateToProps = ({ user, token, products }) => ({
  user,
  token,
  products,
})

const mapDispatchToProps = dispatch => ({
  setFavorite: (token, data, flag) => dispatch(setFavorite(token, data, flag)),
  addViewCount: (token, data) => dispatch(addViewCount(token, data)),
  sendReport: (token, data) => dispatch(sendReport(token, data)),
})

ProductDetailPage.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  products: PropTypes.objectOf(PropTypes.any).isRequired,
  token: PropTypes.objectOf(PropTypes.any).isRequired,
  setFavorite: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductDetailPage)