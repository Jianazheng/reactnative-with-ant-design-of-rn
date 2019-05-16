import {Platform,Linking,Alert,NativeModules,ToastAndroid} from 'react-native';
import deviceInfo from 'react-native-device-info';
import {RNStorage} from './storage'


let setting = {
  lang:'',
  token:'',
};


const api = {
  host:'http://hkbypmh.jkxuetang.com',
  ws:'ws://119.29.163.57:23460',
  version:'v1'
};
const OS = Platform.OS;
const device:any = {};
device.OS = OS;

device.DeviceID = deviceInfo.getUniqueID();
device.UserAgent = deviceInfo.getUserAgent();
device.DeviceBrand = deviceInfo.getBrand();
device.DeviceModel = deviceInfo.getModel();
device.SystemVersion = deviceInfo.getSystemVersion();
device.AppVersion = deviceInfo.getVersion();
device.AppBuildNumber = deviceInfo.getBuildNumber();


function isJSON(str) {
  if (typeof str == 'string') {
      try {
          var obj=JSON.parse(str);
          if(typeof obj == 'object' && obj ){
              return true;
          }else{
              return false;
          }

      } catch(e) {
          return false;
      }
  }
}

function obj2str(obj){
  let formData = '';
  for(let i in obj){
    formData+=i+'='+obj[i]+'&'
  }
  return formData
}

export const Obj2str = obj2str;

export const IsJson = isJSON;

export const Device = device;

export const Api = api;

export function getImg(url){
  let host = api.host
  return host+url
}

export function getTime(str){
  str = Number(str)*1000;
  let nt = new Date(str);
  let mm = nt.getMonth()+1>=10?(nt.getMonth()+1):'0'+(nt.getMonth()+1);
  let dd = nt.getDate()>=10?nt.getDate():'0'+nt.getDate();
  let h = nt.getHours()>=10?nt.getHours():'0'+nt.getHours();
  let m = nt.getMinutes()>=10?nt.getMinutes():'0'+nt.getMinutes();
  if(str==undefined||isNaN(str)||str.length==0){
    return ''
  }else{
    return nt.getFullYear()+'-'+mm+'-'+dd+' '+h+':'+m
  }
}
export function getMin(str){
  str = Number(str)*1000;
  let nt = new Date(str);
  let mm = nt.getMonth()+1>=10?(nt.getMonth()+1):'0'+(nt.getMonth()+1);
  let dd = nt.getDate()>=10?nt.getDate():'0'+nt.getDate();
  let h = nt.getHours()>=10?nt.getHours():'0'+nt.getHours();
  let m = nt.getMinutes()>=10?nt.getMinutes():'0'+nt.getMinutes();
  if(str==undefined||isNaN(str)||str.length==0){
    return ''
  }else{
    return mm+'-'+dd+' '+h+':'+m
  }
}

export function getDate(str){
  str = Number(str)*1000;
  let nt = new Date(str);
  let mm = nt.getMonth()+1>=10?(nt.getMonth()+1):'0'+(nt.getMonth()+1);
  let dd = nt.getDate()>=10?nt.getDate():'0'+nt.getDate();
  if(str==undefined||isNaN(str)||str.length==0){
    return ''
  }else{
    return nt.getFullYear()+'-'+mm+'-'+dd;
  }
}


export function phoneCall(phoneNumber,prompt){
  let url:string;
  if(Platform.OS !== 'android') {
    url = prompt ? 'telprompt:' : 'tel:';
  }
  else {
    url = 'tel:';
  }

  url += phoneNumber;
  LaunchURL(url);
}

export function toWeb(address = null){
	if(!address) {
      //console.log('Missing address argument');
      return;
    }
    if(!isCorrectType('String', address)) {
    	console.log('address was not provided as a string, it was provided as '
    		+ Object.prototype.toString.call(address).slice(8, -1));
    	return;
    }
    LaunchURL(address);
}

const LaunchURL = function(url) {
	Linking.canOpenURL(url).then(supported => {
		if(!supported) {
			//console.log('Can\'t handle url: ' + url);
		} else {
			Linking.openURL(url)
			.catch(err => {
				if(url.includes('telprompt')) {
					// telprompt was cancelled and Linking openURL method sees this as an error
					// it is not a true error so ignore it to prevent apps crashing
					// see https://github.com/anarchicknight/react-native-communications/issues/39
				} else {
					//console.warn('openURL error', err)
				}
			});
		}
	}).catch(err => console.warn('An unexpected error happened', err));
};

