import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  ListView,
  TouchableOpacity,
  Image,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import I18n from '@i18n';
import { connect } from 'react-redux';
import { getChatUserList } from '@redux/Message/actions';
import Container from '@layout/Container';
import { styles } from './styles';
import LoadingSpinner from '@components/LoadingSpinner';
const ICON_REPORT = require('@common/assets/images/my_message/icon.png');

class MyMessagePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listData: [],
      loading: false,
      isError: false,
      message: '',
    }
  }

  componentWillMount() {
    const { user, token, getChatUserList } = this.props;

    this.setState({ loading: true });
    getChatUserList(
      token.tokenInfo.token,
      {
        user_id: user.userInfo.user.customer_id,
      }
    )
  }

  componentWillReceiveProps(nextProps) {
    const { message } = nextProps;

    if (this.props.message.status === 'GET_CHAT_USER_REQUEST' && message.status === 'GET_CHAT_USER_SUCCESS') {
      this.setState({ loading: false }, () => {
        if (message.chatUserList.status === 200) {
          this.setState({ listData: message.chatUserList.messages });
        } else {
          this.setState({ listData: [] })
        }
      })      
    }

    if (this.props.message.status === 'GET_CHAT_USER_REQUEST' && message.status === 'GET_CHAT_USER_FAILED') {
      this.setState({ listData: [] })
    }
  }

  onItemSelect(rowData, rowID) {
    Actions.ChatRoom({ data: rowData })
  }

  _renderRow (rowData, sectionID, rowID, highlightRow) {
    const { user } = this.props;
    let user_id = null;
    if (user.userInfo) {
      user_id = user.userInfo.user.customer_id;
    }

    return (
      <TouchableOpacity 
        activeOpacity={0.6}
        onPress={() => this.onItemSelect(rowData, rowID)}
      >
        <View style={styles.listItem}>
          <View style={styles.leftView}>
            <View style={styles.dateView}>
              <View style={styles.countView}>
                <Text style={styles.textCount}>{rowData.unread_count}</Text>
              </View>
            </View>
            <View>
              <Text style={styles.textName}>
                {rowData.sender_id === user_id ? rowData.receiver_details.name : rowData.sender_details.name}
              </Text>
              <Text style={styles.textMessage}>{rowData.date_added}</Text>
              {/* <View style={styles.bottomWrapper}>
                <Text style={styles.textMessage}>{rowData.message}</Text>
              </View> */}
            </View>
          </View>
          <View style={styles.imageView}>
            <Image source={ICON_REPORT} style={styles.image} />
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  closeAlert() {
    this.setState({ isError: false });
  }

  render() {
    const { listData, loading, isError, message } = this.state;
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const dataSource = ds.cloneWithRows(listData);

    return (
      <Container title={I18n.t('sidebar.my_messages')}>
        <LoadingSpinner visible={loading } />
        <View style={styles.container}>
          {listData.length > 0 && dataSource
            ? <ListView
                ref='listview'
                dataSource={dataSource}
                renderRow={this._renderRow.bind(this)}
                contentContainerStyle={styles.listView}
                enableEmptySections={true}
              />
            : !loading && <Text style={styles.noPackgeText}>{I18n.t('alert.no_chat')}</Text>
          }
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
  getChatUserList: (token, data) => dispatch(getChatUserList(token, data)),
})

MyMessagePage.defaultProps = {
  message: null,
}

MyMessagePage.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  token: PropTypes.objectOf(PropTypes.any).isRequired,
  message: PropTypes.objectOf(PropTypes.any),
  getChatUserList: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyMessagePage)