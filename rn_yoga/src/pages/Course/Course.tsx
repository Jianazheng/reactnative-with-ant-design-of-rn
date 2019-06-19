import React from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {mainStyle,setSize,screenH, screenW} from '../../public/style/style';
import { List,Badge } from '@ant-design/react-native';
import LinearGradient from 'react-native-linear-gradient';
import { IconFill,IconOutline } from '@ant-design/icons-react-native';
import { CourseListItem } from '../../components/Course/CourseItem';


const Item = List.Item;

interface Props {}

class Course extends React.Component<Props> {
  static navigationOptions = {
    tabBarLabel: '课程',
    tabBarIcon: ({focused}) => {
      if (focused) {
        return (
          <IconOutline name="read" size={24} color={mainStyle.czt.color}></IconOutline>
        );
      }
      return (
        <IconOutline name="read" size={24} color={mainStyle.c666.color}></IconOutline>
      );
    },
  }
  constructor(props:Props) {
    super(props);
    this.state = {
      arr: [{},{},{}]
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
        <ScrollView style={[mainStyle.flex1,mainStyle.positonre]}>
          <View style={[mainStyle.flex1]}>
            <View style={[mainStyle.column,mainStyle.bgcfff]}>
              <View style={[mainStyle.pa15,mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.brb1f2]}>
                <TouchableOpacity onPressIn={()=>{this.goto('UserInfo',{})}}>
                  <Image style={[mainStyle.useravator]} source={{}}></Image>
                </TouchableOpacity>
                <View style={[mainStyle.column,mainStyle.flex1,mainStyle.mal15,mainStyle.aiStart]}>
                  <Text style={[mainStyle.c333,mainStyle.fs16]}>binbinMax</Text>
                  <Text style={[mainStyle.czt,mainStyle.fs11,mainStyle.mat5,
                    {
                      borderColor:mainStyle.czt.color,
                      borderWidth:setSize(1),
                      paddingLeft:setSize(12),
                      paddingRight:setSize(12),
                      borderRadius:setSize(40),
                    }
                  ]}>白金会员</Text>
                </View>
                <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween]}>
                  <Text style={[mainStyle.icon,mainStyle.fs24,mainStyle.c666]}>&#xe616;</Text>
                </View>
              </View>
              <View style={[mainStyle.palr15,mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.patb15]}>
                <TouchableOpacity style={[mainStyle.flex1]}>
                  <View style={[mainStyle.column,mainStyle.aiCenter,mainStyle.jcCenter]}>
                    <Text style={[mainStyle.c333,mainStyle.fs18,mainStyle.mab5]}>4</Text>
                    <Text style={[mainStyle.c999,mainStyle.fs12]}>培训课</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={[mainStyle.flex1]}>
                  <View style={[mainStyle.column,mainStyle.aiCenter,mainStyle.jcCenter,mainStyle.brr1f2,mainStyle.brl1f2]}>
                    <Text style={[mainStyle.c333,mainStyle.fs18,mainStyle.mab5]}>2</Text>
                    <Text style={[mainStyle.c999,mainStyle.fs12]}>在线课程</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={[mainStyle.flex1]}>
                  <View style={[mainStyle.column,mainStyle.aiCenter,mainStyle.jcCenter]}>
                    <Text style={[mainStyle.c333,mainStyle.fs18,mainStyle.mab5]}>19</Text>
                    <Text style={[mainStyle.c999,mainStyle.fs12]}>已学完</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={[mainStyle.column,mainStyle.palr15,mainStyle.mat15]}>
              <View style={[mainStyle.column,mainStyle.bgcfff,{borderRadius:setSize(10)}]}>
                <View style={[mainStyle.column,mainStyle.brb1f2]}>
                  <TouchableOpacity 
                  style={[mainStyle.flex1]}
                  onPress={()=>{
                    this.goto('CourseList',{})
                  }}>
                    <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.h100,mainStyle.palr15,]}>
                      <Text style={[mainStyle.fs13,mainStyle.c333]}>我的培训课</Text>
                      <View style={[mainStyle.row,mainStyle.aiCenter]}>
                        <Text style={[mainStyle.fs12,mainStyle.c999]}>全部</Text>
                        <Text style={[mainStyle.icon,mainStyle.c999,mainStyle.fs26,{marginBottom:setSize(5)}]}>&#xe64d;</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={[mainStyle.column]}>
                  {
                    arr.map((val,i)=>(
                      <CourseListItem data={val} navigation={navigation} type='outline'></CourseListItem>
                    ))
                  }
                </View>
              </View>
            </View>
            <View style={[mainStyle.column,mainStyle.palr15,mainStyle.mat15,mainStyle.mab15]}>
              <View style={[mainStyle.column,mainStyle.bgcfff,{borderRadius:setSize(10)}]}>
                <View style={[mainStyle.column,mainStyle.brb1f2]}>
                  <TouchableOpacity 
                  style={[mainStyle.flex1]}
                  onPress={()=>{
                    this.goto('CourseList',{})
                  }}>
                    <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.h100,mainStyle.palr15,]}>
                      <Text style={[mainStyle.fs13,mainStyle.c333]}>我的在线课程</Text>
                      <View style={[mainStyle.row,mainStyle.aiCenter]}>
                        <Text style={[mainStyle.fs12,mainStyle.c999]}>全部</Text>
                        <Text style={[mainStyle.icon,mainStyle.c999,mainStyle.fs26,{marginBottom:setSize(5)}]}>&#xe64d;</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={[mainStyle.column]}>
                  {
                    arr.map((val,i)=>(
                      <CourseListItem data={val} navigation={navigation} type='online'></CourseListItem>
                    ))
                  }
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}



const styles = StyleSheet.create({
  
})

export default Course