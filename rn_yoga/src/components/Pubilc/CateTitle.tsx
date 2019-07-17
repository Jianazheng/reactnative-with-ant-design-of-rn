
import React, { PureComponent } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { mainStyle, setSize, screenW } from '../../public/style/style';



interface Props {
  onClick: () => void,
  btnstyle: any[],
  textstyle: any[],
  title: string,
  navigateTitle: any
}

interface State {

}

export default class BxCateTitle extends PureComponent<Props, State>{

  constructor(props: Props, state: State) {
    super(props);
  }

  handleClick = () => {
    this.props.onClick();
  }

  render() {
    let { title, btnstyle, textstyle, navigateTitle } = this.props;
    if (navigateTitle) {
      return (
        <View style={[mainStyle.row, mainStyle.jcBetween, mainStyle.aiCenter, mainStyle.h100]}>
          <Text style={[mainStyle.c333, mainStyle.fs15, mainStyle.fontbold, textstyle]}>{title}</Text>
          <Text style={[mainStyle.c999, mainStyle.fs12, textstyle]} onPress={() => {
            this.handleClick();
          }}>
            {navigateTitle}
          </Text>
        </View>
      )
    } else {
      return (
        <View style={[mainStyle.row, mainStyle.jcBetween, mainStyle.aiCenter, mainStyle.h100]}>
          <Text style={[mainStyle.c333, mainStyle.fs14, textstyle]}>{title}</Text>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#e2e2e2',
    height: setSize(80),
    borderRadius: setSize(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
})