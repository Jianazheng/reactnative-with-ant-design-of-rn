import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { mainStyle, setSize, screenH, screenW } from '../../public/style/style';
import NavTop from '../../router/navTop';
import { observer, inject } from 'mobx-react';
import WebView from 'react-native-webview';


interface Props { }

@inject('courseStore', 'trainStore')
@observer
class ViewPdf extends React.Component<Props> {
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
    let { params } = navigation.state
    return (
      <View style={[mainStyle.flex1, mainStyle.bgcf7]}>
        <NavTop
          navType="normal"
          title={'在线预览'}
          onPress={() => {
            navigation.goBack();
          }}
        ></NavTop>
        <WebView
          style={[mainStyle.flex1]}
          source={{ uri: params.url }}
        ></WebView>
      </View>
    )
  }
}

const styles = StyleSheet.create({

})

export default ViewPdf