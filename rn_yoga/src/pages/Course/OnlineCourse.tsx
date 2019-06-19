import React from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {mainStyle,setSize,screenH, screenW} from '../../public/style/style';
import { List,Badge } from '@ant-design/react-native';
import LinearGradient from 'react-native-linear-gradient';
import { IconFill,IconOutline } from '@ant-design/icons-react-native';
import BxListView from '../../components/Pubilc/ListView';
import { layout } from './../../public/js/dom';
import { CourseListItem } from '../../components/Course/CourseItem';
import NavTop from '../../router/navTop';

const Item = List.Item;

interface Props {}

class OnlineCourse extends React.Component<Props> {
  static navigationOptions = {
    header:null
  }

  constructor(props:Props) {
    super(props);
    this.state = {
      arr: [{},{},{},{},{},{}]
    };
  }

  goto(routeName:string,params:any){
    this.props.navigation.navigate(routeName,params);
  }

  render(){
    let {arr} = this.state;
    let {navigation} = this.props;
    return (
      <View style={[mainStyle.flex1,mainStyle.bgcf7]}>
        <NavTop
        navType="normal"
        title="我的培训课"
        onPress={()=>{
          this.props.navigation.goBack();
        }}
        ></NavTop>
        <ScrollView style={[mainStyle.flex1]}>
          <View style={[mainStyle.flex1]}>
            <View style={[mainStyle.column,mainStyle.palr15,mainStyle.mat15]}>
              <View style={[mainStyle.column,mainStyle.bgcfff,{borderRadius:setSize(10)}]}>
                <View style={[mainStyle.column,mainStyle.brb1f2]}>
                  <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.h100,mainStyle.palr15,]}>
                    <Text style={[mainStyle.fs13,mainStyle.c333]}>培训课程详情</Text>
                  </View>
                </View>
                <View style={[mainStyle.column]}>
                  <CourseListItem data={{}} navigation={navigation} type='online'></CourseListItem>
                </View>
              </View>
            </View>
            <View style={[mainStyle.column,mainStyle.palr15,mainStyle.mab15]}>
              <Text style={[mainStyle.c333,mainStyle.fs13]}>授课教师</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  
})

export default OnlineCourse