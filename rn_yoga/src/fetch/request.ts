import { OP } from "./option";
import { obj2str } from "../tools/function";
import { Toast } from '@ant-design/react-native';
import userStore from './../store/modules/userStore';
import RNStorage from './../public/js/storage';
import { DeviceEventEmitter } from "react-native";


export class Fetch{
  constructor(api:string,method:string,data:object,headers:any){
    let reqUrl = OP.baseURL+OP.baseVersion+api;
    let reqOption = {};

    headers['token'] = userStore.token;

    switch (headers['Content-Type']) {
      case 'multipart/form-data':
          headers['Content-Type'] = 'multipart/form-data';
          reqOption.body = data;
        break;
      default:
          headers['Content-Type'] = 'application/json';
          if(method=='post'||method=='POST'){
            reqOption.body = JSON.stringify(data);
          }else{
            let strs = '?'+obj2str(data);
            reqUrl+=strs;
          }
        break;
    }

    reqOption.method = method;
    reqOption.headers = headers;
    
    return new Promise((resolve,reject)=>{
      fetch(reqUrl,reqOption)
      .then(async (response) => {
        //console.log(await response.text())
        if(response.status==200||response.status==400){
          return {data:await response.json(),status:response.status}
        }else{
          return {data:await response.text(),status:response.status}
        }
      })
      .then((response) => {
        console.log('接口:'+api,'参数：',data,'返回数据',response)
        switch (response.status) {
          case 200:
            resolve(response.data);
            break;
          case 401:
            Toast.info('验证失败，请重新登录')
            userStore.removeToken()
            RNStorage.remove({key:'token'}).then(ress=>{
              DeviceEventEmitter.emit('TOLOGIN','yes');
            });
            reject(response.data);
            break;
          case 400:
            Toast.info(response.data.message,1.8,undefined,false)
            reject(response.data);
            break;      
          case 500:
            Toast.info('服务器错误：'+response.status+'，接口：'+reqUrl,1.8,undefined,false)
            reject(response.data);
            break;
          default:
            Toast.info('服务器错误：'+response.status+'，接口：'+reqUrl,1.8,undefined,false)
            reject(response.data);
            break;
        }
      })
      .catch((error) => {
        Toast.info('程序错误',1.8,undefined,false)
        console.warn(error)
        reject(error);
      });
    })
  }
}

