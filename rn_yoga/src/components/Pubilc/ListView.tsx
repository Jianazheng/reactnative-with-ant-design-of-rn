
import React from 'react';
import { StyleSheet,FlatList,View,Text } from 'react-native';
import { mainStyle, setSize,screenW } from '../../public/style/style';

/**
 * description 列表组件
 * nomore 不触发上拉加载 
 * onLoadmore 上拉加载方法
 */

interface Props {
  listData:Array<object>,
  listItem:({item,index})=>any,
  colNumber:number,
  onLoadmore:()=>void,
  nomore:boolean,
  loading:boolean,
  pab:number,
  pat:number
}

interface State {
  
}

export default class BxListView extends React.Component<Props,State>{
  
  constructor(props:Props,state:State) {
    super(props);
  }

  onShowMore(){
    let {onLoadmore,nomore} = this.props;
    if(!nomore){
      onLoadmore();
    }
  }
  _renderHeader=()=>{
    let {pat} = this.props;
    return (
      <View style={[{height:pat}]}></View>
    );
  }

  _renderFooter=()=>{
    let {loading,nomore,pab} = this.props;
    if(nomore){
      return (
        <View style={[{height:pab}]}></View>
      );
    }
    if(!loading){
      return (
        <View style={[mainStyle.column]}>
          <View style={[mainStyle.row,mainStyle.patb10,mainStyle.jcCenter,mainStyle.aiCenter]}>
            <Text style={[mainStyle.c999,mainStyle.fs14]}>更多</Text>
          </View>
          <View style={[{height:pab}]}></View>
        </View>
      );
    }else{
      return (
        <View style={[mainStyle.column]}>
          <View style={[mainStyle.row,mainStyle.patb10,mainStyle.jcCenter,mainStyle.aiCenter]}>
            <Text style={[mainStyle.c999,mainStyle.fs14]}>加载中</Text>
          </View>
          <View style={[{height:pab}]}></View>
        </View>
      );
    }
  }

  render(){
    let {listData,listItem,colNumber,loading} = this.props;
    return(
      <View style={[mainStyle.flex1]}>
        <FlatList
        renderItem={listItem}
        contentContainerStyle={{justifyContent:'space-between'}}
        keyExtractor={(item,index)=>index.toString()}
        data={listData}
        numColumns={colNumber}
        initialNumToRender={10}
        refreshing={loading}
        onEndReached={this.onShowMore.bind(this)}
        onEndReachedThreshold={0.1}
        ListHeaderComponent={this._renderHeader.bind(this)}
        ListFooterComponent={this._renderFooter.bind(this)}
        >
        </FlatList>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  
})