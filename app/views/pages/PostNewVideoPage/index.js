import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Video from 'react-native-video';
import CheckBox from 'react-native-modest-checkbox';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';

import I18n from '@i18n';
import Container from '@layout/Container';
import KeyboardScrollView from '@components/KeyboardView';
import { RadioGroup, RadioButton } from '@components/RadioButtonGroup';
import DropdownComponent from '@components/DropdownComponent';
import CategoryComponent from '@components/CategoryComponent';
import LoadingSpinner from '@components/LoadingSpinner';
import CustomAlert from '@components/CustomAlert';
import PostProductLocationPage from '../PostProductLocationPage'

import { styles } from './styles';

import * as COMMON_STYLES from '@common/styles/commonStyles';
import * as COMMON_COLORS from '@common/styles/commonColors';
import { PERIOD_DATA, BUILDING_TYPE_DATA, APARTMENT_ROOM_TYPE } from '@common';

class PostNewVideoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      
      video_url: null,
      videoFileName: null,
      category: 'building',
      location: I18n.t('post_video.select_address'),
      coordinate: null,
      name: '',
      description: '',
      price: '',
      product_type: '0',

      //building
      building_type: '0', // Residential, Commercial

      //apartment
      furniture: false,
      period: '0',    // Daily, Monthly, Yearly
      room_type: '0', // Singular, Familiar

      //office

      //gallery
      street_size: '',

      page: 'post',
      isError: false,
      errorText: '',
    }
    this.player = null;
  }

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {

  }

  onPreview() {
    const propsData = this.state;

    if (!propsData.video_url || !propsData.videoFileName) {
      this.setState({ isError: true })
      this.setState({ errorText: I18n.t('post_video.select_video') })
      return
    }
    if (!propsData.coordinate) {
      this.setState({ isError: true })
      this.setState({ errorText: I18n.t('post_video.select_address') })
      return
    }
    if (propsData.name.length === 0) {
      this.setState({ isError: true })
      this.setState({ errorText: I18n.t('post_video.select_title') })
      return
    } else if (propsData.price.length === 0) {
      this.setState({ isError: true })
      this.setState({ errorText: I18n.t('post_video.select_price') })
      return
    }

    this.setState({ isError: false })
    
    Actions.PostNewVideoPreview({ data: propsData });
  }

  onSelectProductOption(index, value) {
    this.setState({ product_type: index })
  }

  selectCategory(item) {
    this.setState({ category: item });
  }

  onDeleteVideo() {
    this.setState({ video_url: null, videoFileName: null })
  }

  onCamera() {
    if (this.state.video_url === null) {
      const options = {
        title: I18n.t('post_video.record_choose_video'),
        takePhotoButtonTitle: I18n.t('post_video.record_video'),
        chooseFromLibraryButtonTitle: I18n.t('post_video.choose_library'),
        mediaType: 'video',
        allowsEditing: true,
        durationLimit: 300, //limit 5mins
        // noData: true,
        storageOptions: {
          skipBackup: true,
          path: 'videos',
          cameraRoll: true,
          waitUntilSaved: true,
        }
      }
      ImagePicker.showImagePicker(options, (response) => {
        if (response.didCancel) {
        } else if (response.error) {
          console.log('error')
        } else if (response.customButton) {
          console.log('error')
        } else {
          this.setState({ video_url: response.uri, videoFileName: response.fileName });
        }
      })
    } else {
      this.player.presentFullscreenPlayer();
      this.player.seek(0);
    }
  }

  changePage(page) {
    this.setState({ page })
  }

  getAddress(addressArr) {
    if (addressArr) {
      const street = addressArr.street ? (addressArr.street + ', ') : ''
      const city = addressArr.city ? (addressArr.city + ', ') : ''
      const location =  street + city + addressArr.country

      this.setState({ location, coordinate: addressArr.coordinate })
    } else {
      this.setState({ location: I18n.t('post_video.select_address') })
    }
    this.setState({ isError: false })
  }

  render() {
    const {
      loading,
      isError,
      errorText,
      page,
      category,
      video_url,
      location,
      coordinate,
    } = this.state;

    if (page === 'map') {
      return (
        <PostProductLocationPage
          changePage={() => this.changePage('post')}
          coordinate={coordinate}
          getAddress={location => this.getAddress(location)}
          address={location}
        />
      )
    }

    return (
      <Container title={I18n.t('sidebar.post_new_ads')}>
        <LoadingSpinner visible={loading } />

        <CustomAlert 
          title={I18n.t('alert.warning')}
          message={errorText}
          visible={isError} 
          closeAlert={() => this.setState({ isError: false })}
        />

        <View style={styles.container}>
          <KeyboardScrollView>
            <TouchableOpacity onPress={() => this.onCamera()}>
              <View style={styles.videoView}>
                {video_url ?
                  <Video
                    ref={ref => this.player = ref}
                    source={{ uri: video_url }}
                    style={styles.videoThumbnail}
                    resizeMode='cover'
                    autoplay={false}
                    paused
                    onLoadStart={() => this.player.presentFullscreenPlayer}
                  /> :
                  <Icon name='video' style={styles.cameraIcon} />
                }
                {video_url && (
                  <View style={styles.deleteVideo}>
                    <TouchableOpacity onPress={() => this.onDeleteVideo()}>
                      <View style={styles.deleteVideoInner}>
                        <Icon name='video-off' style={styles.deleteVideoIcon} />
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </TouchableOpacity>

            <CategoryComponent selectCategory={item => this.selectCategory(item)} />

            <View style={styles.itemView}>
              <Text style={styles.textTitle}>
                {I18n.t('post_video.location')}
              </Text>
              <TouchableOpacity onPress={() => this.changePage('map')}>
                <View style={styles.addressView}>
                  <Text style={[styles.input, styles.underline]} numberOfLines={2} ellipsizeMode="tail">{this.state.location}</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.itemView}>
              <Text style={styles.textTitle}>
                {I18n.t('post_video.title')}
              </Text>
              <TextInput
                ref="title"
                autoCapitalize="none"
                autoCorrect
                placeholder={I18n.t('post_video.ph_video_name')}
                placeholderTextColor={COMMON_COLORS.PLACEHOLDER_SUB_TEXT_COLOR}
                textAlign="right"
                style={styles.input}
                underlineColorAndroid="transparent"
                returnKeyType={'next'}
                value={this.state.name}
                onChangeText={text => this.setState({ name: text })}
                onSubmitEditing={() => this.refs.description.focus()}
              />
            </View>

            <View style={styles.itemView}>
              <Text style={styles.textTitle}>
                {I18n.t('post_video.description')}
              </Text>
              <TextInput
                ref="description"
                autoCapitalize="none"
                autoCorrect
                multiline
                placeholder={I18n.t('post_video.ph_video_desc')}
                placeholderTextColor={COMMON_COLORS.PLACEHOLDER_SUB_TEXT_COLOR}
                textAlign="right"
                style={styles.input}
                underlineColorAndroid="transparent"
                returnKeyType={'next'}
                value={this.state.description}
                onChangeText={text => this.setState({ description: text })}
                onSubmitEditing={() => this.refs.price.focus()}
              />
            </View>

            <View style={styles.itemView}>
              <Text style={styles.textTitle}>
                  {I18n.t('post_video.price')}
              </Text>
              <TextInput
                ref="price"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder={I18n.t('sar')}
                placeholderTextColor={COMMON_COLORS.PLACEHOLDER_SUB_TEXT_COLOR}
                textAlign="right"
                style={styles.input}
                underlineColorAndroid="transparent"
                returnKeyType={ 'next' }
                value={this.state.price}
                keyboardType="numeric"
                onChangeText={text => this.setState({ price: text })}
              />
            </View>

            <View style={styles.productOptionView}>
              <RadioGroup 
                color='#7D7D7D' 
                style={styles.radioGroup} 
                thickness={2}
                selectedIndex={0}
                onSelect={(index, value) => this.onSelectProductOption(index, value)}
              >
                <RadioButton value={I18n.t('post_video.sale')}>
                  <Text style={styles.textRadio}>{I18n.t('post_video.sale')}</Text>
                </RadioButton>
                <RadioButton value={I18n.t('post_video.rent')}>
                  <Text style={styles.textRadio}>{I18n.t('post_video.rent')}</Text>
                </RadioButton>
              </RadioGroup>
            </View>

            {(category === 'building') && (
              <View style={styles.itemView}>
                <DropdownComponent
                  selectItem={value => this.setState({ building_type: value })}
                  item={BUILDING_TYPE_DATA[parseInt(this.state.building_type)].value}
                  data={BUILDING_TYPE_DATA}
                />
              </View>
            )}

            {(category === 'apartment') && (
              <View style={styles.itemView}>
                <DropdownComponent
                  selectItem={value => this.setState({ period: value })}
                  item={PERIOD_DATA[parseInt(this.state.period)].value}
                  data={PERIOD_DATA}
                />
              </View>
            )}

            {(category === 'apartment') && (
              <View>
                <View style={styles.itemView}>
                  <DropdownComponent
                    selectItem={value => this.setState({ room_type: value })}
                    item={APARTMENT_ROOM_TYPE[parseInt(this.state.room_type)].value}
                    data={APARTMENT_ROOM_TYPE}
                  />
                </View>
                <View style={styles.itemView}>
                  <CheckBox
                    label={I18n.t('post_video.furniture')}
                    labelBefore
                    checkboxStyle={{ width: 20 }}
                    labelStyle={{
                      color: COMMON_COLORS.PLACEHOLDER_TEXT_COLOR,
                      fontSize: COMMON_STYLES.NORMAL_FONT_SIZE,
                      marginBottom: 3,
                      marginRight: 20,
                      fontFamily: COMMON_STYLES.NORMAL_FONT_FAMILY
                    }}
                    onChange={checked => this.setState({ furniture: checked.checked })}
                  />
                </View>
              </View>
            )}

            {(category === 'gallery') && (
              <View>
                <View style={styles.itemView}>
                  <Text style={styles.textTitle}>
                    {I18n.t('post_video.street_size')}
                  </Text>
                  <TextInput
                    ref="streetSize"
                    autoCapitalize="none"
                    autoCorrect
                    placeholder={I18n.t('post_video.ph_meter')}
                    placeholderTextColor={COMMON_COLORS.PLACEHOLDER_SUB_TEXT_COLOR}
                    textAlign="right"
                    style={styles.input}
                    underlineColorAndroid="transparent"
                    returnKeyType={'next'}
                    keyboardType="numeric"
                    value={this.state.street_size}
                    onChangeText={text => this.setState({ street_size: text })}
                  />
                </View>
              </View>
            )}

            <TouchableOpacity onPress={() => this.onPreview()} activeOpacity={0.5}>
              <View style={styles.previewBtnView}>
                <Text style={styles.textPreview}>{I18n.t('sidebar.preview')}</Text>
              </View>
            </TouchableOpacity>
          </KeyboardScrollView>
        </View>
      </Container>
    );
  }
}

export default PostNewVideoPage