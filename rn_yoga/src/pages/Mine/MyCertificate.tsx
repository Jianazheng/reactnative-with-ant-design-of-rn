import React from 'react';
import { Text, View, ScrollView, Image,StyleSheet, TouchableOpacity, WebView } from 'react-native';
import { mainStyle,setSize } from '../../public/style/style';
import {headerTitle,headerRight} from '../../router/navigationBar';
import NavTop from '../../router/navTop';

interface Props {}
interface State {
  
}

class MyCertificate extends React.Component<Props,State> {
  static navigationOptions = {
    header:null
  }
  constructor(props:Props,state:State) {
    super(props);
    this.state = {
      
    };
  }

  render(){
    return (
      <View style={[mainStyle.flex1,mainStyle.column]}>
        <NavTop
        navType="normal"
        title="我的证书"
        onPress={()=>{
          this.props.navigation.goBack();
        }}
        ></NavTop>
        <WebView
        style={[mainStyle.flex1]}
        ref="webView"
        onLoadEnd={() => {
          
        }}
        onMessage={(e)=>{
          console.log(e.nativeEvent.data)
          this.refs.webView.postMessage('RN向H5发送的消息');
        }}
        source={{baseUrl:'',uri:'http://10.0.2.2/login?token=123'}}
        ></WebView>
      </View>
    )
  }
}






export default MyCertificate