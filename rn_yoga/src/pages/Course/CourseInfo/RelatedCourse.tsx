import React, { PureComponent } from 'react';
import { StyleSheet,View } from 'react-native';
import { mainStyle,contentPadding,setSize } from '../../../public/style/style';
import { CourseInfoItem } from '../../../components/Course/CourseItem';
import BxListView from '../../../components/Pubilc/ListView';


interface CourseInfoItemProps {
  data:Array<object>,
}

class RelatedCourse extends React.Component<CourseInfoItemProps>{
  constructor(props:CourseInfoItemProps){
    super(props)
  }
  render (){
    let {data} = this.props;
    return(
      <View style={[mainStyle.pa15]}>
        <BxListView
        nomore={true}
        colNumber={1}
        listData={data}
        listItem={({item,index})=>(<CourseInfoItem data={item}></CourseInfoItem>)}> 
        </BxListView>
      </View>
    )
  }
}

export default RelatedCourse