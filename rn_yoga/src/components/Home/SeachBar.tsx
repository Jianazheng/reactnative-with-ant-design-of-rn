import React from 'react';
import { Text, View, Alert,Keyboard } from 'react-native';
import { Icon, SearchBar } from '@ant-design/react-native';

class HomeSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.clear = () => {
      this.setState({ value: '' });
      Keyboard.dismiss();
    };
    this.onChange = value => {
      this.setState({ value });
    };
  }

  render(){
    let {value} = this.state;
    return (
      <View>
        <SearchBar
          value={value}
          placeholder="搜索"
          onSubmit={value => Alert.alert(value)}
          onChange={this.onChange}
          onCancel={this.clear}
        />
      </View>
    )
  }
}

export default HomeSearchBar