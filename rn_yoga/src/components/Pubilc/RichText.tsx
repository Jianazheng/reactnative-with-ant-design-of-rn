
import React, { PureComponent } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import WebView from 'react-native-webview';
import { mainStyle, setSize, screenW, screenH } from '../../public/style/style';



interface Props {
  text: string
}

interface State {

}

export default class BxRichText extends PureComponent<Props, State>{

  constructor(props: Props, state: State) {
    super(props);
    this.state = {
      height: this.props.height || Dimensions.get('window').height
    }
  }

  onmessage(event) {
    try {
      const action = JSON.parse(event.nativeEvent.data)
      console.log(action)
      if (action.type === 'setHeight' && action.height > 0) {
        this.setState({ height: action.height })
      }
    } catch (error) {
      // pass
      console.log(error)
    }
  }

  render() {
    let { text } = this.props
    let { height } = this.state
    return (
      <View style={[mainStyle.flex1]}>
        <WebView style={[mainStyle.bgcfff, mainStyle.pa15, { height: height, paddingBottom: setSize(140) }]}
          bounces={false}
          onNavigationStateChange={(doc) => {
            let h = !isNaN(parseInt(doc.title)) ? parseInt(doc.title) : height
            this.setState({
              height: h
            })
          }}
          automaticallyAdjustContentInsets
          originWhitelist={['*']}
          decelerationRate='normal'
          scalesPageToFit
          javaScriptEnabled={true} // 仅限Android平台。iOS平台JavaScript是默认开启的。
          domStorageEnabled={true}  // 适用于安卓
          scrollEnabled={false}
          onMessage={(e) => { this.onmessage(e) }}
          source={{
            html: `<!DOCTYPE html><html><head><meta name='viewport' content='width=device-width, initial-scale=1.0, user-scaleable=no'><style type="text/css">
            *{padding:0;margin:0;}
            html,body{min-height:100%;}
            body{padding:10px;}
            .tour_product_explain img{ display: block!important; vertical-align: top!important; width: 100%!important;}
            </style></head><body><div class='tour_product_explain' id='content'>
            ${text}
            </div>
            </body>
            <script>
     window.onload = function () {
       document.title = document.body.clientHeight;
      } 
   </script>
            </html>`,
            baseUrl: ''
          }}>
        </WebView>
      </View>
    )
  }
}
