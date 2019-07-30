import React from 'react';
import { Text, View, ScrollView, Image, StyleSheet, TouchableOpacity, WebView } from 'react-native';
import { mainStyle, setSize, screenW } from '../../public/style/style';
import { headerTitle, headerRight } from '../../router/navigationBar';
import NavTop from '../../router/navTop';
import BxListView from '../../components/Pubilc/ListView';
import { observer, inject } from 'mobx-react';

interface Props { }
interface State {

}
@inject('userStore')
@observer
class MyCertificate extends React.Component<Props, State> {
  static navigationOptions = {
    header: null
  }
  constructor(props: Props, state: State) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {
    let { userStore } = this.props
    userStore.GetCertList()
  }
  render() {
    let { userStore } = this.props
    let certList = userStore.certList
    return (
      <View style={[mainStyle.flex1, mainStyle.column, mainStyle.bgcf7]}>
        <NavTop
          navType="normal"
          title="我的证书"
          onPress={() => {
            this.props.navigation.goBack();
          }}
        ></NavTop>
        {/* <WebView
        style={[mainStyle.flex1]}
        ref="webView"
        onLoadEnd={() => {
          
        }}
        onMessage={(e)=>{
          console.log(e.nativeEvent.data)
          this.refs.webView.postMessage('RN向H5发送的消息');
        }}
        source={{baseUrl:'',uri:'http://10.0.2.2/login?token=123'}}
        ></WebView> */}
        <View style={[mainStyle.flex1]}>
          <BxListView
            onLoadmore={() => {
              userStore.GetCertList()
            }}
            loading={certList.total == null || (certList.total > certList.data.length && certList.total >= 1)}
            listData={certList.data}
            colNumber={1}
            pab={setSize(20)}
            listItem={({ item, index }) => (
              <View style={[mainStyle.row, mainStyle.jcBetween, mainStyle.aiCenter, mainStyle.pa15, mainStyle.bgcfff, mainStyle.brb1f2]}>
                <Image style={[mainStyle.bgcf2, {
                  height: screenW * 0.4,
                  width: screenW * 0.4 * 0.7,
                }]} source={{ uri: 'http://' + item.cert_img }}></Image>
                <View style={[mainStyle.flex1, mainStyle.mal15, mainStyle.patb10, mainStyle.column, mainStyle.jcBetween, { height: screenW * 0.4 }]}>
                  <Text style={[mainStyle.c333, mainStyle.fs13]}>{item.train_name}({item.sku_name})</Text>
                  <View style={[mainStyle.column]}>
                    <Text style={[mainStyle.c333, mainStyle.fs13]}>获取时间</Text>
                    <Text style={[mainStyle.c666, mainStyle.fs12, mainStyle.mat10]}>{item.cert_time}</Text>
                  </View>
                </View>
              </View>
            )}></BxListView>
        </View>
      </View>
    )
  }
}






export default MyCertificate