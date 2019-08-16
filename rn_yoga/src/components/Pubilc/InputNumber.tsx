import React from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { mainStyle, setSize } from '../../public/style/style';
import { Toast } from '@ant-design/react-native';

interface Props {
  leftBtn: JSX.Element,
  autoFocus: boolean,
  placeholder: string,
  onChange: (e: string) => void
}

export default class InputNumber extends React.Component<Props> {
  onChange: (val: string) => void;
  constructor(props: Props) {
    super(props);
    this.state = {
      value: this.props.value || 1
    };
    this.onChange = value => {
      let { max } = this.props;
      let v = value != '' ? parseInt(value) : '';
      if (max == 0 || v >= max) {
        Toast.info('库存不足');
        return;
      }
      this.setState({ value: v }, () => {
        if (this.props.onChange) this.props.onChange(v);
      });
    };
  }
  reduce() {
    let { value } = this.state;
    let { max } = this.props;
    if (max == 0) {
      Toast.info('库存不足');
      return;
    }
    let v = value > 1 ? value - 1 : 1;
    this.setState({ value: v });
    this.onChange(v);
  };
  addNumber() {
    let { value } = this.state;
    let { max } = this.props;
    if (max == 0 || value >= max) {
      Toast.info('库存不足');
      return;
    }
    let v = max ? value < max ? value + 1 : max : value + 1
    this.setState({ value: v });
    this.onChange(v);
  };
  render() {
    let value = this.state.value.toString();
    return (
      <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcCenter, styles.numberSelect]}>
        <TouchableOpacity style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcCenter]}
          onPress={() => {
            this.reduce()
          }}
        >
          <Text style={[mainStyle.icon, mainStyle.c333, mainStyle.fs20, styles.numberSelectBtn]}>&#xe649;</Text>
        </TouchableOpacity>
        <TextInput
          maxLength={4}
          value={value}
          onChangeText={(e) => {
            this.onChange(e);
          }}
          style={[mainStyle.bgcf2, mainStyle.c666, styles.numberSelectInput]}
        ></TextInput>
        <TouchableOpacity style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcCenter]}
          onPress={() => {
            this.addNumber()
          }}
        >
          <Text style={[mainStyle.icon, mainStyle.c333, mainStyle.fs20, styles.numberSelectBtn]}>&#xe648;</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  numberSelect: {
    height: setSize(50),
    width: setSize(200),
    borderRadius: setSize(2),
    backgroundColor: mainStyle.bgcf7.backgroundColor
  },
  numberSelectInput: {
    width: setSize(100),
    height: setSize(50),
    lineHeight: setSize(34),
    textAlign: 'center',
    paddingTop: 0,
    paddingBottom: 0
  },
  numberSelectBtn: {
    width: setSize(50),
    height: setSize(50),
    lineHeight: setSize(50),
    textAlign: 'center'
  }
})



