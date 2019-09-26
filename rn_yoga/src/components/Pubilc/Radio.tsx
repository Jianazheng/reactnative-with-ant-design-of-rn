
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { mainStyle, setSize, screenW } from '../../public/style/style';



interface Props {
  onChange: (selected: boolean) => void,
  size: number,
  data: object,
  color: string,
  checked: boolean | undefined
}

interface State {

}

export default class BxRadio extends React.Component<Props, State>{

  constructor(props: Props, state: State) {
    super(props);
  }


  handleOnChange() {
    let { onChange, data, checked } = this.props;
    if (onChange) {
      onChange({ checked, data });
    }
  }

  render() {
    let { size, color, checked } = this.props;
    if (checked) {
      return (
        <TouchableOpacity
          style={[styles.tapview]}
          onPress={() => {
            this.handleOnChange()
          }}>
          <Text style={[
            mainStyle.icon,
            mainStyle.cfff,
            styles.selectTap,
            size == undefined ? mainStyle.fs22 : { fontSize: size },
            color == undefined ? mainStyle.bgczt : { backgroundColor: color },
          ]}>&#xe64e;
          </Text>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity
          style={[styles.tapview]}
          onPress={() => {
            this.handleOnChange()
          }}>
          <Text style={[
            mainStyle.icon,
            mainStyle.cfff,
            styles.selectTap,
            styles.noselectTap,
            size == undefined ? mainStyle.fs22 : { fontSize: size },
            mainStyle.bgcfff
          ]}>&#xe64e;
          </Text>
        </TouchableOpacity>
      )
    }
  }
}

const styles = StyleSheet.create({
  tapview: {
    padding: setSize(10)
  },
  selectTap: {
    borderRadius: setSize(19),
    overflow: 'hidden',
    padding: setSize(1)
  },
  noselectTap: {
    borderWidth: setSize(1),
    padding: 0,
    borderColor: mainStyle.c666.color
  }
})