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

class CourseList extends React.Component<Props> {
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
        title="我的在线课程"
        onPress={()=>{
          this.props.navigation.goBack();
        }}
        ></NavTop>
        <View style={[mainStyle.flex1]}>
          <BxListView
          pab={setSize(30)}
          pat={setSize(30)}
          onLoadmore={()=>{}}
          colNumber={1}
          listData={arr}
          listItem={({item,index})=>(
            <CourseListItem data={item} navigation={navigation} type='online'></CourseListItem>
          )}
          ></BxListView>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  
})

export default CourseList