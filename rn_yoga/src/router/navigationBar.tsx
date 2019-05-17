import React from 'react';
import { Text, View,TouchableOpacity } from 'react-native';
import { IconFill } from "@ant-design/icons-react-native";
import { mainStyle } from '../public/style/style';

export const headerRight =(children:any)=> (
  <View style={[mainStyle.jcCenter,mainStyle.row,mainStyle.bgcc2]}>
    {children}
  </View>
);

export function headerLeft(){
  return (
    <TouchableOpacity onPressIn={
      this.props.navigation.back()
    } 
      style={[mainStyle.jcCenter,mainStyle.row,mainStyle]}
      >
      <IconFill name="left" size={18} color={mainStyle.c333.color}></IconFill>
      <Text style={[mainStyle.fs14,mainStyle.c333]}>返回</Text>
    </TouchableOpacity>
  )
};


export const headerTitle =(title:string)=>(
  <View style={[mainStyle.jcCenter,mainStyle.row,mainStyle.flex1]}>
    <Text style={[mainStyle.fs12,mainStyle.c333]}>{title}</Text>
  </View>
);
