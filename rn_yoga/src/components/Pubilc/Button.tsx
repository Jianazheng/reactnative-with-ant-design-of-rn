
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { ActivityIndicator } from '@ant-design/react-native';
import { mainStyle, setSize, screenW } from '../../public/style/style';
import LinearGradient from 'react-native-linear-gradient';



interface Props {
  onClick: () => void,
  btnstyle: any,
  textstyle: any,
  title: string,
  disabled: boolean,
  borderRadius: number,
  plain: boolean,
  clear: boolean,
  color: string,
  colors: Array<string>
}

interface State {
  clicked: boolean
}

export default class BxButton extends React.Component<Props, State>{

  constructor(props: Props, state: State) {
    super(props);
    this.state = {
      clicked: false,
    }
  }

  shouldComponentUpdate(np, ns) {
    return np.disabled != this.props.disabled || ns.clicked != this.state.clicked || np.title != this.props.title
  }


  handleClick() {
    let { clicked } = this.state
    if (clicked) {
      return false
    }
    this.setState({
      clicked: true
    }, () => {
      this.props.onClick()
      this.setState({
        clicked: false
      })
    })
  }

  plainStyle(color: string) {
    return {
      borderColor: color,
      borderWidth: this.props.clear ? 0 : setSize(2)
    }
  }

  fillStyle(color: string) {
    return {
      backgroundColor: color,
    }
  }

  plainTextStyle(color: string) {
    return {
      color: color
    }
  }

  render() {
    let { clicked } = this.state
    let { title, disabled, btnstyle, textstyle, borderRadius, color, colors, plain } = this.props
    if (borderRadius == undefined) borderRadius = setSize(6)
    if (!disabled && !clicked) {
      return (
        <TouchableOpacity
          onPress={() => {
            this.handleClick();
          }}
        >
          {
            plain ?
              <View
                style={[
                  styles.btn, mainStyle.bgcfff,
                  {
                    borderRadius: borderRadius
                  },
                  this.plainStyle(color),
                  btnstyle]}>
                <Text style={[
                  mainStyle.czt, mainStyle.fs13,
                  this.plainTextStyle(color),
                  textstyle]}
                >
                  {title}
                </Text>
              </View>
              :
              <LinearGradient
                colors={typeof colors == "object" ? [...colors] : [color, color]}
                start={{ x: 0.1, y: 0.2 }}
                end={{ x: 0.9, y: 0.8 }}
                style={[
                  styles.btn, mainStyle.bgczt,
                  {
                    borderRadius: borderRadius
                  },
                  btnstyle]}>
                <Text style={[
                  mainStyle.cfff, mainStyle.fs13,
                  { color: '#fff' },
                  textstyle]}
                >
                  {title}
                </Text>
              </LinearGradient>
          }
        </TouchableOpacity>
      )
    } else {
      return (
        <View
          style={[
            styles.btn,
            {
              borderRadius: borderRadius
            },
            btnstyle,
            mainStyle.bgccc]}>
          <Text style={[mainStyle.fs13, textstyle, mainStyle.cfff]}>{title}</Text>
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