
import React, { Component } from 'react'
import {
  TextInput,
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native'
import AutoSuggest from './AutoSuggest'
import { styles } from './styles';
import * as COMMON_COLORS from '@common/styles/commonColors';

export default class AutoSuggestComponent extends Component {
  onChange = (text) => {
    this.props.handleChange(text);
  }

  render () {
    const {label, value} = this.props;
    return (
      <View
        style={styles.container}
      >
        <Text style={styles.textTitle}>
          {label}
        </Text>
        <AutoSuggest
          otherTextInputProps={{ editable: true }}
          onChangeText={selection => this.onChange(selection)}
          onSelect={selection => this.onChange(selection)}
          terms={[
            'Apple',
            'Banana',
            'Orange',
            'Strawberry',
            'Lemon',
            'Cantaloupe',
            'Peach',
            'Mandarin',
            'Date',
            'Kiwi',
          ]}
          placeholder={label}
          placeholderTextColor='darkgrey'
        />
      </View>
    )
  }
}