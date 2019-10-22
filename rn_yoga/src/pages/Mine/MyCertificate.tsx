import React from 'react';
import { Text, View, ScrollView, Image, StyleSheet, TouchableOpacity, WebView } from 'react-native';
import { mainStyle, setSize, screenW } from '../../public/style/style';
import { headerTitle, headerRight } from '../../router/navigationBar';
import NavTop from '../../router/navTop';
import BxListView from '../../components/Pubilc/ListView';
import PreviewImage from '../../components/Pubilc/PreviewImage';
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
      currrentImage: 0,
      visible: false
    };
  }
  componentDidMount() {
    let { userStore } = this.props
    userStore.GetCertList(true);
  }
  render() {
    let { userStore } = this.props
    let { currrentImage, visible } = this.state
    let certList = userStore.certList
    let imageData = userStore.imageData;
    return (
      <View style={[mainStyle.flex1, mainStyle.column, mainStyle.bgcf7, mainStyle.positonre]}>
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
              userStore.GetCertList(false)
            }}
            loading={certList.total == null || (certList.total > certList.data.length && certList.total >= 1)}
            listData={certList.data}
            colNumber={1}
            pab={setSize(20)}
            listItem={({ item, index }) => (
              <TouchableOpacity onPress={() => {
                console.log(index)
                this.setState({
                  currrentImage: index,
                  visible: true
                })
                // this.props.navigation.push('MyCertImg', { src: 'http://' + item.cert_img })
              }}>
                <View style={[mainStyle.row, mainStyle.jcBetween, mainStyle.aiCenter, mainStyle.pa15, mainStyle.bgcfff, mainStyle.brb1f2]}>
                  <Image style={[mainStyle.bgcf2, {
                    height: screenW * 0.4,
                    width: screenW * 0.4 * 0.7,
                  }]} source={{ uri: 'http://' + item.cert_img }}></Image>
                  <View style={[mainStyle.flex1, mainStyle.mal15, mainStyle.patb10, mainStyle.column, mainStyle.jcBetween, { height: screenW * 0.4 }]}>
                    <Text style={[mainStyle.c333, mainStyle.fs13]}>{item.train_name}</Text>
                    <View style={[mainStyle.column]}>
                      <Text style={[mainStyle.c333, mainStyle.fs13]}>获取时间</Text>
                      <Text style={[mainStyle.c666, mainStyle.fs12, mainStyle.mat10]}>{item.cert_time}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}></BxListView>
        </View>
        <PreviewImage curentImage={currrentImage} imaeDataUrl={imageData} modalVisible={visible} cancel={() => { console.log(1); this.setState({ visible: false }) }}></PreviewImage>
      </View>
    )
  }
}






export default MyCertificate