import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { mainStyle, setSize, screenH, screenW } from '../../public/style/style';
import NavTop from '../../router/navTop';
import { observer, inject } from 'mobx-react';
import BxRichText from '../../components/Pubilc/RichText';
import BxListView from '../../components/Pubilc/ListView';


interface Props { }

@inject('publicStore')
@observer
class NotiveList extends React.Component<Props> {
  static navigationOptions = {
    header: null
  }

  constructor(props: Props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    let { navigation, publicStore } = this.props
    publicStore.getNotiveList()
  }

  handleLoadList(reload: boolean) {

  }

  render() {
    let { navigation, publicStore: { notiveList } } = this.props
    return (
      <View style={[mainStyle.flex1, mainStyle.bgcf7]}>
        <NavTop
          navType="normal"
          title={'公告列表'}
          onPress={() => {
            navigation.goBack();
          }}
        ></NavTop>
        <BxListView
          pab={setSize(20)}
          listData={notiveList}
          colNumber={1}
          nomore={false}
          loading={notiveList == null}
          onLoadmore={() => {
            this.handleLoadList(false)
          }}
          listItem={({ item, index }) =>
            <TouchableOpacity
              style={[mainStyle.mab15]}
              onPress={() => {
                navigation.navigate('NotiveDetail', { id: item.id })
              }}
            >
              <View style={[mainStyle.pa15, mainStyle.flex1, mainStyle.column, mainStyle.bgcfff]}>
                <Image
                  style={[mainStyle.h300, mainStyle.imgCover, mainStyle.bgcf2, mainStyle.mab15, { width: screenW - setSize(60), borderRadius: setSize(6) }]}
                  source={{ uri: 'http://' + item.image }}
                ></Image>
                <Text style={[mainStyle.fs13, mainStyle.c333]} numberOfLines={2}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          }
        ></BxListView>
      </View>
    )
  }
}

const styles = StyleSheet.create({

})

export default NotiveList