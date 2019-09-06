

import React, { PureComponent } from 'react';
import { Text, View, Dimensions, ScrollView } from 'react-native';
import { mainStyle, contentPadding, setSize, screenH } from '../../../public/style/style';

let { width, height } = Dimensions.get('window');

interface CourseInfoItemProps {
  data: Array<object>,
}

export default class ApplyNotice extends PureComponent<CourseInfoItemProps>{
  constructor(props: CourseInfoItemProps) {
    super(props)
  }
  render() {
    let { data, relate } = this.props;
    return (
      <View
        style={[mainStyle.column, mainStyle.jcBetween, mainStyle.flex1]}>
        <Text style={[mainStyle.patb20, mainStyle.fs13, mainStyle.c999]}>购买此课程之前，{relate == 0 ? '完成以下一个课程' : '必须确保已完成以下课程'}：</Text>
        <ScrollView
          scrollEnabled
          nestedScrollEnabled
          style={[mainStyle.flex1, mainStyle.patb10]}>
          {
            data.map((val, i) => {
              return (
                <View key={i} style={[{ marginBottom: setSize(10) }]}>
                  <Text
                    style={[mainStyle.czt, mainStyle.icon, mainStyle.tl,
                    {
                      fontSize: setSize(100),
                      height: setSize(50),
                      lineHeight: setSize(75),
                      position: 'absolute',
                      top: 0,
                      left: -setSize(40)
                    }
                    ]}>
                    &#xe646;
                  </Text>
                  <Text style={[mainStyle.fs12, mainStyle.c333, mainStyle.flex1,
                  {
                    lineHeight: setSize(44),
                    marginLeft: setSize(50)
                  }
                  ]}>{val.train_name}({val.sku_name})</Text>
                </View>
              )
            })
          }
          <Text style={[mainStyle.czt, mainStyle.fs12, mainStyle.mat20, mainStyle.mab10]}>未全部完成以上课程{relate == 0 ? '(之一)' : ''}的学员，请先报名学习上述课程。</Text>
        </ScrollView>
      </View>
    )
  }
}


