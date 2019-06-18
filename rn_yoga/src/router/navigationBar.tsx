import React from 'react';
import { Text, View,TouchableOpacity } from 'react-native';
import { IconFill } from "@ant-design/icons-react-native";
import { mainStyle,screenW, setSize } from '../public/style/style';

let headbar = setSize(120);

export const headerRight =(children:any)=> (
  <View style={[mainStyle.aiCenter,mainStyle.row,mainStyle.bgcfff,{width:headbar}]}>
    {children}
  </View>
);

export function headerLeft(_this:any){
  return (
    <View style={[mainStyle.aiCenter,mainStyle.row,mainStyle.bgcfff,{width:headbar}]}>
      <TouchableOpacity onPressIn={()=>{
        //_this.props.navigation.goBack();
        console.log(_this)
      }}>
        <Text style={[mainStyle.icon,mainStyle.c333,mainStyle.fs20]}>&#xe64c;</Text>
      </TouchableOpacity>
    </View>
  )
};


export const headerTitle =(title:string)=>(
  <View style={[mainStyle.jcCenter,mainStyle.row]}>
    <Text style={[mainStyle.fs15,mainStyle.c333]}>{title}</Text>
  </View>
);
