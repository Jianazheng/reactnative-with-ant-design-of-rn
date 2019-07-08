import React from 'react';
import { Text, View, ScrollView, Alert, Image,TouchableOpacity } from 'react-native';
import {ActivityIndicator, SwipeAction} from '@ant-design/react-native';
import { mainStyle,screenH, setSize } from '../../public/style/style';
import {headerTitle,headerRight} from '../../router/navigationBar';
import NavTop from '../../router/navTop';
import { observer, inject } from 'mobx-react';

interface Props {}
interface State {
  
}

@inject('addressStore')
@observer
class Address extends React.Component<Props,State> {
  static navigationOptions = {
    // headerTitle:headerTitle('个人信息'),
    // headerRight:headerRight(<Text></Text>),
    header:null
  }
  timer:any;
  codeRef:any;
  constructor(props:Props,state:State) {
    super(props);
    this.state = {
      loading:true
    };
  }

  componentDidMount(){
    let {addressStore,navigation} = this.props
    addressStore.getAddress()
    .then(res=>{this.setState({loading:false})})
    .catch(err=>{this.setState({loading:false})})
  }

  goto(routeName:string,params:any){
    let {navigation} = this.props;
    navigation.navigate(routeName,params);
  }

  right(val){
    let {addressStore} = this.props
    return [
      {
        text: '设置默认',
        onPress: () => {
          let postData = {...val}
          postData.is_default = 1
          addressStore.addOrEditAddress(postData,'edit')
        },
        style: { backgroundColor: mainStyle.cztc.color, color: 'white' },
      },
      {
        text: '删除',
        onPress: () => {
          this.setState({loading:true})
          addressStore.delectAddress(val.id)
          .then(res=>{this.setState({loading:false})})
          .catch(err=>{this.setState({loading:false})})
        },
        style: { backgroundColor: mainStyle.c999.color, color: 'white' },
      },
    ];
  }

  render(){
    let {loading} = this.state
    let {addressStore,navigation} = this.props
    let addressArr = addressStore.addressArr
    return (
      <View style={[mainStyle.column,mainStyle.flex1,mainStyle.bgcf7]}>
        <NavTop
        navType="normal"
        title="地址管理"
        onPress={()=>{
          navigation.goBack();
        }}
        children={(
          <View style={[mainStyle.column,mainStyle.aiEnd,mainStyle.flex1,mainStyle.mar15]}>
            <TouchableOpacity
            onPress={()=>{
              navigation.navigate('AddressOperate',{type:'add',id:''});
            }}
            >
              <Text style={[mainStyle.czt,mainStyle.fs13]}>新增地址</Text>
            </TouchableOpacity>
          </View>
        )}
        ></NavTop>
        <ActivityIndicator
        toast
        size="large"
        text="加载中..."
        animating={loading}
        ></ActivityIndicator>
        <View style={[mainStyle.flex1,mainStyle.mat15]}>
          <ScrollView style={[mainStyle.flex1]}>
            <View style={[mainStyle.flex1,mainStyle.palr15,mainStyle.column]}>
              {
                addressArr.map((val,i)=>(
                  <SwipeAction
                  key={i}
                  autoClose
                  style={[mainStyle.bgcfff,mainStyle.mab15,{borderRadius:setSize(6)}]}
                  right={this.right(val)}
                  >
                    <TouchableOpacity onPress={()=>{
                      this.goto('AddressOperate',{id:val.id,type:'edit'})
                    }}>
                      <View style={[mainStyle.flex1,mainStyle.column,mainStyle.jcBetween,mainStyle.pa15]}>
                        <View style={[mainStyle.flex1,mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween]}>
                          <Text style={[mainStyle.c333,mainStyle.fs14]}>{val.consignee}</Text>
                          <Text style={[mainStyle.c333,mainStyle.fs14]}>{val.mobile}</Text>
                        </View>
                        <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.mat10]}>
                          <Text style={[mainStyle.c666,mainStyle.fs13]}>{val.region.length>0?(val.region[0]+' - '+val.region[1]+' - '+val.region[2]):null}</Text>
                          <Text style={[mainStyle.cztc,mainStyle.fs12]}>{val.is_default==1?'默认地址':''}</Text>
                        </View>
                        <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.mat10]}>
                          <Text style={[mainStyle.fs12,mainStyle.c666,mainStyle.lh36]} numberOfLines={2}>
                            {val.address}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </SwipeAction>
                ))
              }
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }
}

export default Address