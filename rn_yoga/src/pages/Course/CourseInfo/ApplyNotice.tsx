

import React, { PureComponent } from 'react';
import { Text, View, Dimensions,ScrollView } from 'react-native';
import { mainStyle,contentPadding,setSize, screenH } from '../../../public/style/style';

let { width, height } = Dimensions.get('window');

interface CourseInfoItemProps {
  data:Array<object>,
}

export default class ApplyNotice extends PureComponent<CourseInfoItemProps>{
  constructor(props:CourseInfoItemProps){
    super(props)
  }
  render (){
    let {data} = this.props;
    return(
      <View
       style={[mainStyle.column,mainStyle.jcBetween,mainStyle.flex1]}>
        <Text style={[mainStyle.patb20,mainStyle.fs13,mainStyle.c999]}>报名此课程之前，必须确保已完成以下培训课程：</Text>
        <ScrollView 
        scrollEnabled 
        nestedScrollEnabled 
        style={[mainStyle.flex1,mainStyle.patb10]}>
          {
            data.map((val,i)=>{
              return (
                <View key={i} style={[{marginBottom:setSize(10)}]}>
                  <Text 
                  style={[mainStyle.czt,mainStyle.icon,mainStyle.tl,
                  {fontSize:setSize(100),
                    height:setSize(50),
                    lineHeight:setSize(75),
                    position:'absolute',
                    top:0,
                    left:-setSize(40)
                  }
                  ]}>
                    &#xe646;
                  </Text>
                  <Text style={[mainStyle.fs12,mainStyle.c333,mainStyle.flex1,
                    {
                      lineHeight:setSize(44),
                      marginLeft:setSize(50)
                    }
                  ]}>{val.train_name}</Text>
                </View>
              )
            })
          }
        </ScrollView>
        <Text style={[mainStyle.czt,mainStyle.fs12,mainStyle.mat20]}>未全部完成以上培训课程的学员，请先报名学习上述培训课程。</Text>
      </View>
    )
  }
}


