
import React from 'react';
import { TouchableOpacity, Text, StyleSheet,View, ScrollView,Animated,Easing } from 'react-native';
import { mainStyle, setSize,screenW, screenH } from '../../public/style/style';
import { ADDRESS } from '../../tools/addressJson';


interface Props {
  onChange:(arr:Array<string>)=>void
}

interface State {
  
}
const sitem = setSize(60)

export default class BxAddressPicker extends React.Component<Props,State>{
  
  constructor(props:Props,state:State) {
    super(props);
    this.state = {
      current1:0,
      current2:0,
      current3:0,
      showPicker:new Animated.Value(-(sitem*9+setSize(200))),
      opacityPicker:new Animated.Value(0),
    }
  }

  componentDidMount(){
    this.refs.scrollRef1.scrollTo({y:-sitem*4,animated:false})
  }

  _ScrollEndDrag(e,custr){
    let y = e.nativeEvent.contentOffset.y
    let index = Math.ceil(y/sitem)
    if(custr=='1'&&index>=ADDRESS.length-1){
      index = ADDRESS.length-1
    }
    for(let i=1;i<=3;i++){
      if(Number(custr)<i){
        this.setState(()=>{
          let state = {}
          state['current'+i] = 0
          return state
        },()=>{
          this.refs['scrollRef'+i].scrollTo({y:0, animated: false})
        })
      }
    }
    this._selectTo(index,custr)
  }

  _selectTo(index,custr) {
    let y = index*sitem
    if(this.refs['scrollRef'+custr]) {
      this.refs['scrollRef'+custr].scrollTo({y, animated: true})
      this.setState(()=>{
        let state = {}
        state['current'+custr] = index
        return state
      })
    }
  }

  _sure(){
    let {current1,current2,current3} = this.state;
    let province = ADDRESS[current1].value
    let city = ADDRESS[current1].children[current2].length>0?ADDRESS[current1].children[current2].value:'';
    let district = ADDRESS[current1].children[current2].length>0?ADDRESS[current1].children[current2].children[current3].value:'';
    let region = [province,city,district]
    if(this.props.onChange)this.props.onChange(region)
    this._close()
  }

  _close(){
    let {showPicker,opacityPicker} = this.state
    Animated.timing(showPicker, {
      toValue: -(sitem*9+setSize(200)),
      easing: Easing.ease,
      duration: 200
    }).start();
    Animated.timing(opacityPicker, {
      toValue: 0,
      easing: Easing.ease,
      duration: 200
    }).start();
  }

  _show(){
    let {showPicker,opacityPicker} = this.state
    Animated.timing(showPicker, {
      toValue: 0,
      easing: Easing.ease,
      duration: 200
    }).start();
    Animated.timing(opacityPicker, {
      toValue: 1,
      easing: Easing.ease,
      duration: 200
    }).start();
  }

  render(){
    let {current1,current2,current3,showPicker} = this.state;
    let province = ADDRESS
    let city = province[current1].children
    let district = city[current2].children
    return (
      <View>
        <Animated.View style={[mainStyle.column,mainStyle.bgcfff,styles.pickerMain,mainStyle.brt1e2,
          {bottom:showPicker}
        ]}>
          <View style={[mainStyle.h100,mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.brb1e2]}>
            <TouchableOpacity 
            onPress={()=>{this._close()}}
            style={[mainStyle.pa15]}>
              <Text style={[mainStyle.fs13,mainStyle.cztc]}>取消</Text>
            </TouchableOpacity>
            <Text style={[mainStyle.fs13,mainStyle.c666]}>选择地址</Text>
            <TouchableOpacity
            style={[mainStyle.pa15]}
            onPress={()=>{this._sure()}}
            >
              <Text style={[mainStyle.fs13,mainStyle.cztc]}>确认</Text>
            </TouchableOpacity>
          </View>
          <View style={[mainStyle.row,mainStyle.jcBetween,{width:screenW}]}>
            <ScrollView
            style={[styles.scrollMain]}
            ref="scrollRef1"
            bounces = {false}
            showsVerticalScrollIndicator = {false}
            scrollEventThrottle={16}
            onScrollEndDrag={(e)=>{this._ScrollEndDrag(e,'1')}}
            >
              {
                ADDRESS.map((val,i)=>(
                  <AddressItem key={i} item={val} lengths={province.length} index={i} current={current1}></AddressItem>
                ))
              }
            </ScrollView>
            <ScrollView
            style={[styles.scrollMain]}
            ref="scrollRef2"
            bounces = {false}
            showsVerticalScrollIndicator = {false}
            scrollEventThrottle={16}
            onScrollEndDrag={(e)=>{this._ScrollEndDrag(e,'2')}}
            >
              {
                city.map((val,i)=>(
                  <AddressItem key={i} item={val} lengths={city.length} index={i} current={current2}></AddressItem>
                ))
              }
            </ScrollView>
            <ScrollView
            style={[styles.scrollMain]}
            ref="scrollRef3"
            bounces = {false}
            showsVerticalScrollIndicator = {false}
            scrollEventThrottle={16}
            onScrollEndDrag={(e)=>{this._ScrollEndDrag(e,'3')}}
            >
              {
                district.map((val,i)=>(
                  <AddressItem key={i} item={val} lengths={district.length} index={i} current={current3}></AddressItem>
                ))
              }
            </ScrollView>
          </View>
        </Animated.View>
      </View>
    )
  }
}

interface itemProps {
  index:number,
  current:number,
  item:object,
  lengths:number
}

class AddressItem extends React.Component<itemProps> {
  constructor(props:itemProps) {
    super(props)
  }
  render(){
    let {index,current,item,lengths} = this.props
    return (
      <TouchableOpacity
      style={[
        styles.scrollItem,
        mainStyle.row,
        mainStyle.aiCenter,
        mainStyle.jcCenter,
        (index==lengths-1)?{marginBottom:4*sitem}:null,
        (index==0)?{marginTop:4*sitem}:null,
      ]}>
        <Text style={[
          mainStyle.fs13,(current==index)?styles.itemcheck:mainStyle.c999,
          {
            opacity:(current==index)?1:0.8
          }  
        ]}>{item.value}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  pickerMain:{
    width:screenW,
    position:'absolute',
    zIndex:100,
    left:0
  },
  scrollMain:{
    height:sitem*9,
    width:screenW/3
  },
  scrollItem:{
    height:sitem,
    width:screenW/3,
  },
  itemcheck:{
    color:mainStyle.cztc.color,
    fontSize:mainStyle.fs15.fontSize
  }
})