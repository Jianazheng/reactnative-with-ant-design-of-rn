
import Login from '../pages/Login/Login';
import Register from '../pages/Login/Register';
import Forget from '../pages/Login/Forget';
import {IndexTabs} from './tabs';
import Password from './../pages/Login/Password';


export const navItem = {
  Login: {screen: Login},
  Register:{screen:Register},
  Forget:{screen:Forget},
  Password:{screen:Password},
  Tab: {
    screen: IndexTabs,
    navigationOptions: () => ({
        header: null
    })
  }
}

export const navConfig = {
  initialRouteName: 'Tab',
  headerMode: 'float',
  navigationOptions:{
    gesturesEnabled:true,
  }
}