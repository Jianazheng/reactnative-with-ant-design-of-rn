
import React from 'react';
import { StyleSheet,FlatList,View,Text } from 'react-native';
import { mainStyle, setSize,screenW } from '../../public/style/style';
import { ActivityIndicator } from '@ant-design/react-native';

/**
 * description 列表组件
 * nomore 不触发上拉加载 true:没有更多 false:配合loading上拉加载
 * loading true加载中，false:没了
 * onLoadmore 上拉加载方法
 * listData 展示的数据，数组形式
 * listItem 数据的载体组件
 * colNumber 一行显示组件数
 * pab 滚动视图的下边距
 * pat 滚动视图的上边距
 */

interface Props {
  listData:Array<object>,
  listItem:({item,index})=>any,
  colNumber:number,
  onLoadmore:()=>void,
  nomore:boolean,
  loading:boolean,
  pab:number,
  pat:number,
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
    }else{
      if(!loading){
        return (
          <View style={[mainStyle.column,mainStyle.mat10]}>
            <View style={[mainStyle.row,mainStyle.patb10,mainStyle.jcCenter,mainStyle.aiCenter]}>
              <Text style={[mainStyle.c999,mainStyle.fs14]}>没有了</Text>
            </View>
            <View style={[{height:pab}]}></View>
          </View>
        );
      }else{
        return (
          <View style={[mainStyle.column,mainStyle.mat10]}>
            <View style={[mainStyle.row,mainStyle.patb10,mainStyle.jcCenter,mainStyle.aiCenter]}>
              <ActivityIndicator color={mainStyle.c666.color}></ActivityIndicator>
              <Text style={[mainStyle.c666,mainStyle.fs14,mainStyle.mal10]}>加载中</Text>
            </View>
            <View style={[{height:pab}]}></View>
          </View>
        );
      }
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
        onEndReachedThreshold={0.2}
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