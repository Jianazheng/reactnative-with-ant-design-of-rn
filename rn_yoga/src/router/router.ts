
import {IndexTabs} from './tabs';
import Login from '../pages/Login/Login';
import Register from '../pages/Login/Register';
import Forget from '../pages/Login/Forget';
import Password from './../pages/Login/Password';
import UserInfo from './../pages/Mine/UserInfo';
import CourseInfo from './../pages/Course/CourseInfo';


export const navItem = {
  Login: {screen: Login},
  Register:{screen:Register},
  Forget:{screen:Forget},
  Password:{screen:Password},
  UserInfo:{screen:UserInfo},
  CourseInfo:{screen:CourseInfo},
  Tab: {
    screen: IndexTabs,
    navigationOptions: () => ({
        header: null
    })
  }
}

export const navConfig = {
  initialRouteName: 'CourseInfo',
  headerMode: 'float',
  navigationOptions:{
    gesturesEnabled:true,
  }
}