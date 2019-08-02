import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { mainStyle, setSize, screenH, screenW } from '../../public/style/style';
import NavTop from '../../router/navTop';


interface Props { }
interface State {
  content: string
}

class WebArea extends React.Component<Props> {
  static navigationOptions = {
    header: null
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      content: ''
    };
  }

  componentDidMount() {
    let { navigation } = this.props
    let { params } = navigation.state;
    this.setState({
      content: params.url
    })
  }

  render() {
    let { navigation } = this.props
    let { content } = this.state
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
          source={{ uri: content }}
        ></WebView>
      </View>
    )
  }
}

const styles = StyleSheet.create({

})

export default WebArea