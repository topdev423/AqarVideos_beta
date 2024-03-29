import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Modal
} from 'react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';

const loading_icon = require('@common/assets/images/loading_icon/splash_loading.gif');

export default class LoadingSpinner extends Component {
  constructor(props){
    super(props);
  }

  render(){
    const { visible } = this.props;
    return(
        <Modal
          animationType={'none'}
          transparent
          visible={visible}
          onRequestClose={() => {}}
        >
          <View style={{ flex: 1 }}/>
          <View
            style={{
              height: 80,
              width: 80,
              alignItems:'center',
              justifyContent:'center',
              backgroundColor:'#3434347f',
              borderRadius:10,
              alignSelf:'center'
            }}
          >
            <Image
              source={loading_icon}
              style={{
                width: 50,
                height: 50,
              }}
            />
          </View>
          <View style={{ flex: 1 }} />
        </Modal>
    );
  }
}