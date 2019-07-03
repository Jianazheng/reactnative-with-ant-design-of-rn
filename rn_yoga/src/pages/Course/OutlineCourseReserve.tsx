import React from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {mainStyle,setSize,screenH, screenW} from '../../public/style/style';
import { Checkbox } from '@ant-design/react-native';
import NavTop from '../../router/navTop';
import BxButton from '../../components/Pubilc/Button';
import { observer, inject } from 'mobx-react';


interface Props {}

let imgw = (screenW-setSize(120))*0.34;

@inject('trainStore')
@observer
class OutlineCourseReserve extends React.Component<Props> {
  static navigationOptions = {
    header:null
  }

  constructor(props:Props) {
    super(props);
    this.state = {
      arr: [{},{},{},{},{},{}],
    };
  }

  componentDidMount(){
    let {navigation,trainStore} = this.props
    let {params} = navigation.state
    trainStore.getTrainService(params.id)
  }

  goto(routeName:string,params:any){
    this.props.navigation.navigate(routeName,params);
  }

  selectService(index:number){
    let {trainStore} = this.props
    trainStore.selectService(index)
  }

  handleEnsureService(){
    let {navigation,trainStore} = this.props
    trainStore.serviceEnsure()
    .then(res=>{
      trainStore.toEnsureService()
      .then(success=>{
        navigation.goBack()
      })
    })
  }

  render(){
    let {navigation,trainStore} = this.props
    let trainService = trainStore.trainService
    return (
      <View style={[mainStyle.flex1,mainStyle.bgcf7]}>
        <NavTop
        navType="normal"
        title="预定服务"
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
                    <Text style={[mainStyle.fs13,mainStyle.c333]}>预定说明</Text>
                  </View>
                </View>
                <View style={[mainStyle.column,mainStyle.pa15]}>
                  <Text style={[mainStyle.c999,mainStyle.fs13,mainStyle.lh36]}>此课程提供以下预定服务，对预定价格或时间有疑问，可查看培训课程介绍，或咨询在线客服</Text>
                  <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.mat15]}>
                    <TouchableOpacity onPress={()=>{
                      this.goto('CourseInfo',{id:trainService.course_id})
                    }}>
                      <View style={[mainStyle.row,mainStyle.aiCenter]}>
                        <Text style={[mainStyle.icon,mainStyle.czt]}>&#xe623;</Text>
                        <Text style={[mainStyle.c333,mainStyle.fs12,mainStyle.mal5]}>查看培训详情</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <View style={[mainStyle.row,mainStyle.aiCenter]}>
                        <Text style={[mainStyle.icon,mainStyle.czt]}>&#xe610;</Text>
                        <Text style={[mainStyle.c333,mainStyle.fs12,mainStyle.mal5]}>咨询在线客服</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            <View style={[mainStyle.column,mainStyle.palr15,mainStyle.mat15]}>
              <View style={[mainStyle.column,mainStyle.bgcfff,{borderRadius:setSize(10)}]}>
                <View style={[mainStyle.column,mainStyle.brb1f2]}>
                  <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.h100,mainStyle.palr15,]}>
                    <Text style={[mainStyle.fs13,mainStyle.c333]}>预定内容</Text>
                  </View>
                </View>
                <View style={[mainStyle.column]}>
                  <View style={[mainStyle.flex1,mainStyle.pa15,mainStyle.brb1f2]}>
                    <View style={[mainStyle.row,mainStyle.aiStart,mainStyle.jcBetween]}>
                      <Image
                      style={[{width:imgw,height:imgw,borderRadius:setSize(6)}]}
                      mode="widthFix" 
                      source={{uri:'http://'+trainService.img}}>
                      </Image>
                      <View style={[mainStyle.column,mainStyle.jcBetween,mainStyle.flex1,mainStyle.mal15,{height:imgw}]}>
                        <Text style={[mainStyle.fs13,mainStyle.c333]}>{trainService.train_name}</Text>
                        <View style={[mainStyle.row,mainStyle.aiEnd,mainStyle.jcBetween,mainStyle.wrap]}>
                          {
                            trainService.server.map((val,i)=>(
                              <TouchableOpacity key={i} style={[mainStyle.mat10,{width:(screenW-imgw-setSize(170))/2}]} onPress={event => {this.selectService(i)}}>
                                <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.positonre]}>
                                  <Checkbox
                                    disabled
                                    checked={val.checked}
                                    style={[val.checked?{ color: mainStyle.czt.color }:{color: mainStyle.c999.color}]}
                                    >
                                  </Checkbox>
                                  <Text style={[mainStyle.fs13,mainStyle.c333,mainStyle.mal5,{
                                    width:(screenW-imgw-setSize(200))/2,
                                    left:-setSize(50),
                                    paddingLeft:setSize(50),
                                    zIndex:1
                                  }]}>{val.server_name}</Text>
                                </View>
                              </TouchableOpacity>
                            ))
                          }
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={[mainStyle.column,mainStyle.pa15]}>
                    <Text style={[mainStyle.c333,mainStyle.fs12]}>预定截止时间：{trainService.endtime}</Text>
                    <Text style={[mainStyle.c999,mainStyle.fs11,mainStyle.mat5]}>请确定认清楚服务内容后再勾选预定，服务费用将在线下收取</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={[mainStyle.h120,mainStyle.row,mainStyle.aiCenter,mainStyle.jcCenter,mainStyle.bgcfff,mainStyle.brt1f2]}>
          <BxButton
          title={'确认预定'}
          colors={[mainStyle.czt.color,mainStyle.cztc.color]}
          borderRadius={setSize(60)}
          btnstyle={[{width:screenW-setSize(120),height:setSize(80)}]}
          onClick={()=>{
            this.handleEnsureService()
          }}
          ></BxButton> 
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  
})

export default OutlineCourseReserve