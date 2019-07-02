import { Text } from "react-native";
import { Toast } from '@ant-design/react-native';
import { mainStyle } from "../public/style/style";

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

export function obj2str(params:object) {
  let str = '';
  for(let i in params){
    str+=i+'='+params[i]+'&'
  }
  return str
}

export function randomCode(length:number) {
  let num = '';
  for(let i=0;i<length;i++){
    let im = Math.floor(Math.random()*10).toString();
    num+=im
  }
  return num
}

export function splitStr(str:string,sp:string){
  let newstr
  if(typeof str == 'string'){
    newstr = str.split(sp)[0]
  }
  return newstr
}
