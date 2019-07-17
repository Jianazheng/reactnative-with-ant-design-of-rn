
import React, { PureComponent } from 'react';
import { View, WebView } from 'react-native';
import { mainStyle, setSize, screenW } from '../../public/style/style';



interface Props {
  text: string
}

interface State {

}

export default class BxRichText extends PureComponent<Props, State>{

  constructor(props: Props, state: State) {
    super(props);
  }

  render() {
    let { text } = this.props;
    return (
      <View style={[mainStyle.flex1]}>
        <WebView style={[mainStyle.bgcfff, mainStyle.flex1, mainStyle.pa15]}
          originWhitelist={['*']}
          scrollEnabled={true}
          source={{
            html: '<head><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"></head>'
              + text,
            baseUrl: ''
          }}>
        </WebView>
      </View>
    )
  }
}
