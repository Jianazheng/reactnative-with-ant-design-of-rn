import React from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {mainStyle,setSize,screenH, screenW} from '../../public/style/style';
import { Checkbox,ActivityIndicator } from '@ant-design/react-native';
import LinearGradient from 'react-native-linear-gradient';
import { CourseListItem } from '../../components/Course/CourseItem';
import NavTop from '../../router/navTop';
import { CourseTeacherItem2 } from '../../components/Course/TeacherItem';
import BxButton from '../../components/Pubilc/Button';
import { observer, inject } from 'mobx-react';
import { splitStr } from '../../tools/function';


interface Props {}

let imgw = (screenW-setSize(120))*0.28;

@inject('trainStore')
@observer
class OutlineCourse extends React.Component<Props> {
  static navigationOptions = {
    header:null
  }

  constructor(props:Props) {
    super(props);
    this.state = {
      loading:true
    };
  }

  componentDidMount(){
    let {navigation,trainStore} = this.props
    let {params} = navigation.state
    trainStore.getTrainCourseInfo(params.id)
    .then(res=>{
      this.setState({
        loading:false
      })
    }).catch(err=>{
      this.setState({
        loading:false
      })
    })
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

  serviceReserve=(trainCourseInfo)=>(
    <View style={[mainStyle.column,mainStyle.pa15,mainStyle.aiCenter]}>
      <Text style={[mainStyle.fs13,mainStyle.c999]}>您还未预定此课程的任何服务，去预定一些吧~</Text>
      <BxButton
      title={'去预定'}
      colors={[mainStyle.czt.color,mainStyle.cztc.color]}
      borderRadius={setSize(60)}
      btnstyle={[{width:screenW-setSize(120),height:setSize(80)},mainStyle.mat20]}
      onClick={()=>{
        this.goto('OutlineCourseReserve',{id:trainCourseInfo.id})
      }}
      ></BxButton>      
    </View>
  )

  render(){
    let {loading} = this.state
    let {navigation,trainStore} = this.props
    let trainCourseInfo = trainStore.trainCourseInfo
    return (
      <View style={[mainStyle.flex1,mainStyle.bgcf7]}>
        <NavTop
        navType="normal"
        title="我的培训课"
        onPress={()=>{
          this.props.navigation.goBack();
        }}
        ></NavTop>
        <ActivityIndicator
        toast
        size="large"
        text="加载中..."
        animating={loading}
        ></ActivityIndicator>
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
                  <CourseListItem data={trainCourseInfo} navigation={navigation} type='outline'></CourseListItem>
                </View>
                <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.palr15,mainStyle.h100]}>
                  <Text style={[mainStyle.c333,mainStyle.fs13]}>授课教师</Text>
                </View>
                <ScrollView
                style={[mainStyle.flex1,mainStyle.mab15,{height:setSize(160)}]}
                nestedScrollEnabled
                scrollEnabled
                horizontal
                >
                  <View style={[mainStyle.flex1,mainStyle.row,mainStyle.pal15]}>
                    {
                      trainCourseInfo.teacher.map((val,i)=>(
                        <CourseTeacherItem2 key={i} data={val}></CourseTeacherItem2>
                      ))
                    }
                  </View>
                </ScrollView>
              </View>
            </View>
            <View style={[mainStyle.column,mainStyle.palr15,mainStyle.mat15]}>
              <View style={[mainStyle.column,mainStyle.bgcfff,{borderRadius:setSize(10)}]}>
                <View style={[mainStyle.column,mainStyle.brb1f2]}>
                  <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.h100,mainStyle.palr15,]}>
                    <Text style={[mainStyle.fs13,mainStyle.c333]}>上课凭证</Text>
                  </View>
                </View>
                <View style={[mainStyle.column]}>
                <TouchableOpacity style={[mainStyle.flex1,mainStyle.pa15]} 
                  onPress={()=>{
                    //this.goto('OnlineCourse',{})
                  }}>
                    <View style={[mainStyle.row,mainStyle.aiStart,mainStyle.jcBetween]}>
                      <Image
                      style={[{width:imgw,height:imgw,borderRadius:setSize(6)},mainStyle.bgcf2]}
                      mode="widthFix" 
                      source={{uri:trainCourseInfo.classcertificate}}>
                      </Image>
                      <View style={[mainStyle.column,mainStyle.jcBetween,mainStyle.flex1,mainStyle.mal15]}>
                        <View style={[mainStyle.row,mainStyle.mat5,mainStyle.mab5]}>
                          <Text style={[mainStyle.c999,mainStyle.fs11,mainStyle.bgcf7,mainStyle.flex1,mainStyle.lh36,
                            {
                              borderRadius:setSize(4),
                              paddingLeft:setSize(14),
                              paddingRight:setSize(14),
                              paddingTop:setSize(4),
                              paddingBottom:setSize(4)
                            }
                          ]}>上课凭证在上培训课期间用于验证报道，仅
                          在培训课有效期内有效，逾期无效</Text>
                        </View>
                        <View style={[mainStyle.row,mainStyle.aiEnd,mainStyle.jcBetween]}>
                          <View>
                            <Text style={[mainStyle.fs13,mainStyle.c333,mainStyle.mat5]}>有效期</Text>
                            <Text style={[mainStyle.fs12,mainStyle.c666]}>{splitStr(trainCourseInfo.train_start_time,' ')}-{splitStr(trainCourseInfo.train_end_time,' ')}</Text>
                          </View>
                          <Text style={[mainStyle.fs13,mainStyle.c333,mainStyle.mat5]}>{trainCourseInfo.status==1?'已报到':'未报到'}</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={[mainStyle.column,mainStyle.palr15,mainStyle.mat15,mainStyle.mab30]}>
              <View style={[mainStyle.column,mainStyle.bgcfff,{borderRadius:setSize(10)}]}>
                <View style={[mainStyle.column,mainStyle.brb1f2]}>
                  <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.h100,mainStyle.palr15,]}>
                    <Text style={[mainStyle.fs13,mainStyle.c333]}>预定服务</Text>
                  </View>
                </View>
                {/** 预定服务 */}
                {
                  trainCourseInfo.server!=undefined
                  ?trainCourseInfo.server.constructor==Array
                  ?<View style={[mainStyle.column,mainStyle.pa15]}>
                    <View style={[mainStyle.row,mainStyle.aiEnd,mainStyle.wrap,mainStyle.flex1]}>
                    {
                      trainCourseInfo.server.map((val,i)=>(
                        <TouchableOpacity key={i} style={[{width:(screenW-setSize(120))/4}]}>
                          <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.positonre]}>
                            <Checkbox
                              disabled
                              checked={true}
                              style={{ color: mainStyle.czt.color }}
                              >
                            </Checkbox>
                            <Text style={[mainStyle.fs13,mainStyle.c333,mainStyle.mal5,{
                              width:(screenW-setSize(170))/4,
                              left:-setSize(50),
                              paddingLeft:setSize(50),
                              zIndex:1
                            }]}>{val}</Text>
                          </View>
                        </TouchableOpacity>
                      ))
                    }
                    </View>
                    <View style={[mainStyle.column,mainStyle.aiStart,mainStyle.mat15,{width:screenW-setSize(120),paddingLeft:setSize(4)}]}>
                      <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.mab15,{}]}>
                        <Text style={[mainStyle.icon,mainStyle.c999,mainStyle.fs14]}>&#xe659;</Text>
                        <Text style={[mainStyle.c999,mainStyle.fs12,mainStyle.mal5]}>如需变更服务请联系在线客服</Text>
                      </View>
                      <TouchableOpacity>
                        <View style={[mainStyle.row,mainStyle.aiCenter]}>
                          <Text style={[mainStyle.icon,mainStyle.czt]}>&#xe623;</Text>
                          <Text style={[mainStyle.c333,mainStyle.fs12,mainStyle.mal5]}>咨询在线客服</Text>
                        </View>
                      </TouchableOpacity>
                    </View>   
                  </View>
                  :this.serviceReserve(trainCourseInfo)
                  :this.serviceReserve(trainCourseInfo)
                }
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

export default OutlineCourse