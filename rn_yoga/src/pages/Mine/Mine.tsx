import React from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {mainStyle,setSize,screenH, screenW} from '../../public/style/style';
import { List,Badge } from '@ant-design/react-native';
import LinearGradient from 'react-native-linear-gradient';
import { IconFill,IconOutline } from '@ant-design/icons-react-native';


const Item = List.Item;

interface Props {}

class Mine extends React.Component<Props> {
  static navigationOptions = {
    tabBarLabel: '个人中心',
    tabBarIcon: ({focused}) => {
      if (focused) {
        return (
          <IconOutline name="user" size={24} color={mainStyle.czt.color}></IconOutline>
        );
      }
      return (
        <IconOutline name="user" size={24} color={mainStyle.c666.color}></IconOutline>
      );
    },
  }
  constructor(props:Props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  goto(routeName:string,params:any){
    this.props.navigation.navigate(routeName,params);
  }

  render(){
    return (
      <View style={[mainStyle.flex1,mainStyle.bgcf7]}>
        <ScrollView style={[mainStyle.flex1,mainStyle.positonre]}>
          <View style={[mainStyle.flex1,mainStyle.positonre]}>
            <View style={[styles.userbg]} onLayout={(e)=>{
              console.log(e.nativeEvent.layout)
            }}>
              <LinearGradient 
                colors={['#FF6243','#FF2043']} 
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 0 }} 
                style={[mainStyle.flex1]}
                >
              </LinearGradient>
            </View>
            <View style={[styles.userinfo,mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween]}>
              <TouchableOpacity onPressIn={()=>{this.goto('UserInfo',{})}}>
                <Image style={[mainStyle.useravator]} source={{}}></Image>
              </TouchableOpacity>
              <View style={[mainStyle.column,mainStyle.flex1,mainStyle.palr10,mainStyle.aiStart]}>
                <Text style={[mainStyle.cfff,mainStyle.fs16]}>binbinMax</Text>
                <Text style={[mainStyle.cfff,mainStyle.fs13,mainStyle.mat5,
                  {
                    borderColor:'#fff',
                    borderWidth:setSize(1),
                    paddingLeft:setSize(12),
                    paddingRight:setSize(12),
                    borderRadius:setSize(40),
                  }
                ]}>白金会员</Text>
              </View>
              <View style={[mainStyle.column,mainStyle.aiEnd]}>
                <Text style={[mainStyle.icon,mainStyle.fs24,mainStyle.cfff]}>&#xe616;</Text>
                <Text style={[mainStyle.lh44,mainStyle.mat10]}>
                  <Text style={[mainStyle.icon,mainStyle.fs16,mainStyle.cfff]}>&#xe638;</Text>
                  <Text style={[mainStyle.icon,mainStyle.fs14,mainStyle.cfff]}> 4300分</Text>
                </Text>
              </View>
            </View>
            <View style={[mainStyle.column,mainStyle.palr15,{top:-screenW*0.08}]}>
              <View style={[mainStyle.column,mainStyle.bgcfff,{borderRadius:setSize(10)},mainStyle.mab15]}>
                <View style={[mainStyle.brb1f2,mainStyle.patb15,mainStyle.palr15]}>
                  <View style={[mainStyle.jcBetween,mainStyle.row,mainStyle.aiCenter]}>
                    <Text style={[mainStyle.fs14,mainStyle.c333]}>订单信息</Text>
                  </View>
                </View>
                <View style={[mainStyle.palr15,mainStyle.mab15,mainStyle.row]}>
                  <TouchableOpacity style={[mainStyle.flex1]} onPress={()=>{
                    this.goto('MyOrder',{})
                  }}>
                    <View style={[mainStyle.column,mainStyle.aiCenter,mainStyle.jcCenter]}>
                      <Image style={[mainStyle.bgcc2,styles.orderImg]}></Image>
                      <Text style={[mainStyle.fs13,mainStyle.c333]}>全部</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={[mainStyle.flex1]}>
                    <View style={[mainStyle.column,mainStyle.aiCenter,mainStyle.jcCenter]}>
                      <Image style={[mainStyle.bgcc2,styles.orderImg]}></Image>
                      <Text style={[mainStyle.fs13,mainStyle.c333]}>培训订单</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={[mainStyle.flex1]}>
                    <View style={[mainStyle.column,mainStyle.aiCenter,mainStyle.jcCenter]}>
                      <Image style={[mainStyle.bgcc2,styles.orderImg]}></Image>
                      <Text style={[mainStyle.fs13,mainStyle.c333]}>课程订单</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={[mainStyle.flex1]}>
                    <View style={[mainStyle.column,mainStyle.aiCenter,mainStyle.jcCenter]}>
                      <Image style={[mainStyle.bgcc2,styles.orderImg]}></Image>
                      <Text style={[mainStyle.fs13,mainStyle.c333]}>商品订单</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View> 
              <View style={[mainStyle.column,mainStyle.bgcfff,{borderRadius:setSize(10)},mainStyle.mab15]}>
                <View style={[mainStyle.column]}>
                  <TouchableOpacity 
                  style={[mainStyle.flex1,mainStyle.brb1f2]}
                  onPress={()=>{
                    this.goto('MyCollect',{})
                  }}>
                    <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.h100,mainStyle.palr15,]}>
                      <View style={[mainStyle.row,mainStyle.aiCenter]}>
                        <Text style={[mainStyle.icon,mainStyle.c999,mainStyle.fs22]}>&#xe655;</Text>
                        <Text style={[mainStyle.fs13,mainStyle.c333,mainStyle.mal10]}>我的收藏</Text>
                      </View>
                      <Text style={[mainStyle.icon,mainStyle.c666,mainStyle.fs26]}>&#xe64d;</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity 
                  style={[mainStyle.flex1,mainStyle.brb1f2]}
                  onPress={()=>{
                    this.goto('MyCertificate',{})
                  }}
                  >
                    <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.h100,mainStyle.palr15,]}>
                      <View style={[mainStyle.row,mainStyle.aiCenter]}>
                        <Text style={[mainStyle.icon,mainStyle.c999,mainStyle.fs22]}>&#xe61c;</Text>
                        <Text style={[mainStyle.fs13,mainStyle.c333,mainStyle.mal10]}>我的证书</Text>
                      </View>
                      <Text style={[mainStyle.icon,mainStyle.c666,mainStyle.fs26]}>&#xe64d;</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={[mainStyle.flex1]}>
                    <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.h100,mainStyle.palr15,]}>
                      <View style={[mainStyle.row,mainStyle.aiCenter]}>
                        <Text style={[mainStyle.icon,mainStyle.c999,mainStyle.fs22]}>&#xe62b;</Text>
                        <Text style={[mainStyle.fs13,mainStyle.c333,mainStyle.mal10]}>我的会员</Text>
                      </View>
                      <Text style={[mainStyle.icon,mainStyle.c666,mainStyle.fs26]}>&#xe64d;</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>   
              <View style={[mainStyle.column,mainStyle.bgcfff,{borderRadius:setSize(10)},mainStyle.mab15]}>
                <View style={[mainStyle.brb1f2,mainStyle.patb15,mainStyle.palr15]}>
                  <View style={[mainStyle.jcBetween,mainStyle.row,mainStyle.aiCenter]}>
                    <Text style={[mainStyle.fs14,mainStyle.c333]}>我的账户</Text>
                  </View>
                </View>
                <View style={[mainStyle.column]}>
                  <TouchableOpacity style={[mainStyle.flex1,mainStyle.brb1f2]}>
                    <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.h100,mainStyle.palr15,]}>
                      <View style={[mainStyle.row,mainStyle.aiCenter]}>
                        <Text style={[mainStyle.icon,mainStyle.c999,mainStyle.fs22]}>&#xe658;</Text>
                        <Text style={[mainStyle.fs13,mainStyle.c333,mainStyle.mal10]}>密码修改</Text>
                      </View>
                      <Text style={[mainStyle.icon,mainStyle.c666,mainStyle.fs26]}>&#xe64d;</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={[mainStyle.flex1]}>
                    <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.h100,mainStyle.palr15,]}>
                      <View style={[mainStyle.row,mainStyle.aiCenter]}>
                        <Text style={[mainStyle.icon,mainStyle.c999,mainStyle.fs18,{marginLeft:setSize(6)}]}>&#xe668;</Text>
                        <Text style={[mainStyle.fs13,mainStyle.c333,mainStyle.mal10]}>退出登录</Text>
                      </View>
                      <Text style={[mainStyle.icon,mainStyle.c666,mainStyle.fs26]}>&#xe64d;</Text>
                    </View>
                  </TouchableOpacity>
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
  userbg:{
    width:screenW*1.2,
    left:-screenW*0.1,
    borderBottomLeftRadius:setSize(160),
    borderBottomRightRadius:setSize(160),
    overflow:'hidden',
    top:0,
    height:screenW*0.4,
  },
  userinfo:{
    height:screenH*0.15,
    borderTopLeftRadius:setSize(10),
    borderTopRightRadius:setSize(10),
    width:screenW-setSize(60),
    top:screenW*0.05,
    position:'absolute',
    left:setSize(30),
    bottom:0,
    zIndex:1,
  },
  orderImg:{
    height:(screenW-setSize(400))/4,
    width:(screenW-setSize(400))/4,
    marginTop:setSize(30),
    marginBottom:setSize(20),
  }
})

export default Mine