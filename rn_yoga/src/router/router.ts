
import Login from '../pages/Login/Login';
import {IndexTabs} from './../tabs/IndexTabs';


export const navItem = {
  Login: {screen: Login},
  Tab: {
    screen: IndexTabs,
    navigationOptions: () => ({
        header: null
    })
  }
}

export const navConfig = {
  initialRouteName: 'Tab',
  headerMode: 'screen',
  navigationOptions:{
    headerTitleStyle:{
      fontSize:14,
    },
    tabBarVisible:false,
    header:null,
  }
}