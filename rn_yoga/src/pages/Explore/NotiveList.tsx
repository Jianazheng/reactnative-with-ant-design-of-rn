import React from 'react';
import { View, ScrollView, StyleSheet, WebView, TouchableOpacity } from 'react-native';
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
      .then(res => {

      })
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
          listData={notiveList.data.slice()}
          colNumber={1}
          nomore={false}
          loading={notiveList.total == null || notiveList.total > notiveList.data.length}
          onLoadmore={() => {
            this.handleLoadList(false)
          }}
          listItem={({ item, index }) =>
            <TouchableOpacity
            >
              <View>
                <Image></Image>
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