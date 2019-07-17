import React from 'react';
import { Text, View } from 'react-native';
import { mainStyle, setSize } from '../../public/style/style';
import BxButton from '../../components/Pubilc/Button';
import NavTop from '../../router/navTop';

interface Props { }
interface State {

}

class Payfail extends React.Component<Props, State> {
  static navigationOptions = {
    header: null,
  }
  constructor(props: Props, state: State) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <View style={[mainStyle.flex1, mainStyle.column, mainStyle.bgcf7]}>
        <NavTop
          navType="normal"
          title="支付失败"
          onPress={() => {
            this.props.navigation.goBack();
          }}
        ></NavTop>
        <View style={[mainStyle.bgcfff, mainStyle.column, mainStyle.aiCenter, mainStyle.patb20]}>
          <Text style={[mainStyle.icon, mainStyle.c999, { fontSize: setSize(140), marginTop: setSize(120) }]}>&#xe654;</Text>
          <Text style={[mainStyle.c333, mainStyle.fs13, mainStyle.mat20]}>支付失败</Text>
          <Text style={[mainStyle.c999, mainStyle.fs10, mainStyle.mat20]}>你可以在未支付订单中继续支付</Text>
          <BxButton
            title={'返回首页'}
            colors={[mainStyle.czt.color, mainStyle.cztc.color]}
            btnstyle={[mainStyle.mat20,
            {
              borderRadius: setSize(4),
              width: setSize(260)
            }
            ]}
            textstyle={[mainStyle.cfff, mainStyle.fs14]}
            onClick={() => {
              this.props.navigation.popToTop()
            }}
          ></BxButton>
        </View>
      </View>
    )
  }
}

export default Payfail