import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { mainStyle, setSize, screenH, screenW } from '../../public/style/style';
import NavTop from '../../router/navTop';


interface Props { }


class WebArea extends React.Component<Props> {
  static navigationOptions = {
    header: null
  }

  constructor(props: Props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {

  }

  render() {
    let { navigation } = this.props
    return (
      <View style={[mainStyle.flex1, mainStyle.bgcf7]}>
        <NavTop
          navType="normal"
          title={'邱显峰整体瑜伽'}
          onPress={() => {
            navigation.goBack();
          }}
        ></NavTop>
        <WebView
          originWhitelist={['*']}
          scrollEnabled={true}
          source={{ uri: 'https://www.baidu.com' }}
        ></WebView>
      </View>
    )
  }
}

const styles = StyleSheet.create({

})

export default WebArea