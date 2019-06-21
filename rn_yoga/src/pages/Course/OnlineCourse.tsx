import React from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {mainStyle,setSize,screenH, screenW} from '../../public/style/style';
import { Checkbox } from '@ant-design/react-native';
import LinearGradient from 'react-native-linear-gradient';
import { CourseListItem } from '../../components/Course/CourseItem';
import NavTop from '../../router/navTop';
import { CourseTeacherItem2 } from '../../components/Course/TeacherItem';
import BxButton from '../../components/Pubilc/Button';


interface Props {}

let imgw = (screenW-setSize(120))*0.28;

class OnlineCourse extends React.Component<Props> {
  static navigationOptions = {
    header:null
  }

  constructor(props:Props) {
    super(props);
    this.state = {
      arr: [{},{},{},{},{},{}],
      checkbox:[{title:'座位',checked:true},{title:'餐点',checked:false},{title:'酒店',checked:false},{title:'大巴',checked:false}]
    };
  }

  goto(routeName:string,params:any){
    this.props.navigation.navigate(routeName,params);
  }

  selectService(index:number){
    let {checkbox} = this.state;
    let newReason = checkbox;
    newReason[index].checked = !newReason[index].checked;
    this.setState({
      checkbox:newReason,
    })
  }

  render(){
    let {arr,checkbox} = this.state;
    let {navigation} = this.props;
    return (
      <View style={[mainStyle.flex1,mainStyle.bgcf7]}>
        <NavTop
        navType="normal"
        title="我的在线课程"
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
                    <Text style={[mainStyle.fs13,mainStyle.c333]}>在线课程详情</Text>
                  </View>
                </View>
                <View style={[mainStyle.column]}>
                  <CourseListItem data={{}} navigation={navigation} type='online'></CourseListItem>
                </View>
                <View style={[mainStyle.column,mainStyle.pa15,mainStyle.aiCenter]}>
                  <Text style={[mainStyle.fs12,mainStyle.c999]}>上次学习时间：2019.06.01-06.30</Text>
                  <BxButton
                  title={'继续学习'}
                  colors={[mainStyle.czt.color,mainStyle.cztc.color]}
                  borderRadius={setSize(60)}
                  btnstyle={[{width:screenW-setSize(120),height:setSize(70)},mainStyle.mat10]}
                  onClick={()=>{
                    this.goto('OnlineCourseInfo',{})
                  }}
                  ></BxButton>      
                </View>        
              </View>
            </View>
            <View style={[mainStyle.column,mainStyle.palr15,mainStyle.mat15]}>
              <View style={[mainStyle.column,mainStyle.bgcfff,{borderRadius:setSize(10)}]}>
                <View style={[mainStyle.column,mainStyle.brb1f2]}>
                  <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.h100,mainStyle.palr15,]}>
                    <Text style={[mainStyle.fs13,mainStyle.c333]}>目录</Text>
                  </View>
                </View>
                <View style={[mainStyle.column,mainStyle.flex1,mainStyle.pal15,{paddingTop:setSize(30)}]}>
                  <Text style={[mainStyle.fs12,mainStyle.c333,mainStyle.aiCenter,mainStyle.mab10]}>1、课程介绍</Text>
                  <TouchableOpacity>
                    <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.h100,mainStyle.brb1f2]}>
                      <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween]}>
                        <Text style={[mainStyle.icon,mainStyle.czt]}>&#xe63d;</Text>
                        <Text style={[mainStyle.fs12,mainStyle.c333,mainStyle.mal5]}>对中医的理论理解</Text>
                      </View>
                      <Text style={[mainStyle.icon,mainStyle.c999,mainStyle.fs28]}>&#xe64d;</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.h100,mainStyle.brb1f2]}>
                      <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween]}>
                        <Text style={[mainStyle.icon,mainStyle.czt]}>&#xe63d;</Text>
                        <Text style={[mainStyle.fs12,mainStyle.c333,mainStyle.mal5]}>对中医的理论理解</Text>
                      </View>
                      <Text style={[mainStyle.icon,mainStyle.c999,mainStyle.fs28]}>&#xe64d;</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={[mainStyle.column,mainStyle.flex1,mainStyle.pal15,{paddingTop:setSize(30)}]}>
                  <Text style={[mainStyle.fs12,mainStyle.c333,mainStyle.aiCenter,mainStyle.mab10]}>1、课程介绍</Text>
                  <TouchableOpacity>
                    <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.h100,mainStyle.brb1f2]}>
                      <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween]}>
                        <Text style={[mainStyle.icon,mainStyle.czt]}>&#xe63d;</Text>
                        <Text style={[mainStyle.fs12,mainStyle.c333,mainStyle.mal5]}>对中医的理论理解</Text>
                      </View>
                      <Text style={[mainStyle.icon,mainStyle.c999,mainStyle.fs28]}>&#xe64d;</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.h100]}>
                      <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween]}>
                        <Text style={[mainStyle.icon,mainStyle.czt]}>&#xe63d;</Text>
                        <Text style={[mainStyle.fs12,mainStyle.c333,mainStyle.mal5]}>对中医的理论理解</Text>
                      </View>
                      <Text style={[mainStyle.icon,mainStyle.c999,mainStyle.fs28]}>&#xe64d;</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={[mainStyle.column,mainStyle.palr15,mainStyle.mat15,mainStyle.mab30]}>
              <View style={[mainStyle.column,mainStyle.bgcfff,{borderRadius:setSize(10)}]}>
                <View style={[mainStyle.flex1]}>
                  <View style={[mainStyle.column,mainStyle.brb1f2]}>
                    <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.h100,mainStyle.palr15,]}>
                      <Text style={[mainStyle.fs13,mainStyle.c333]}>授课教师</Text>
                    </View>
                  </View>
                  <ScrollView
                  style={[mainStyle.flex1,mainStyle.mab15,mainStyle.mat15,{height:setSize(160)}]}
                  nestedScrollEnabled
                  scrollEnabled
                  horizontal
                  >
                    <View style={[mainStyle.flex1,mainStyle.row,mainStyle.pal15]}>
                      {
                        arr.map((val,i)=>(
                          <CourseTeacherItem2 key={i} data={val}></CourseTeacherItem2>
                        ))
                      }
                    </View>
                  </ScrollView>
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

export default OnlineCourse