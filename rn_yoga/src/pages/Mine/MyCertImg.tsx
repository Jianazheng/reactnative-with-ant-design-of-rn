import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { mainStyle, setSize, screenH, screenW } from '../../public/style/style';
import NavTop from '../../router/navTop';


interface Props { }
interface State {
  content: string
}

class MyCertImg extends React.Component<Props> {
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
    console.log(params);
    this.setState({
      content: params.src
    })
  }

  render() {
    let { navigation } = this.props
    let { content } = this.state
    let { params } = navigation.state;

    return (
      <View style={[mainStyle.flex1, mainStyle.bgcf7]}>
        <NavTop
          navType="normal"
          title={'邱显峰整体瑜伽'}
          onPress={() => {
            navigation.goBack();
          }}
        ></NavTop>
        <Image
          style={[mainStyle.bgcf2, {
            height: screenH - setSize(120),
            width: screenW,
          }]}
          source={{ uri: content || params.src }}
        ></Image>
      </View>
    )
  }
}

const styles = StyleSheet.create({

})

export default MyCertImg