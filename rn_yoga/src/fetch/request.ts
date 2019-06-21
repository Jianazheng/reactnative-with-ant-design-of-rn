import { OP } from "./option";
import { obj2str } from "../tools/function";
import { Toast } from '@ant-design/react-native';


export class Fetch{
  constructor(api:string,method:string,data:object,headers:any){
    let reqUrl = OP.baseURL+OP.baseVersion+api;
    let reqOption = {};

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
        return {data:await response.json(),status:response.status}
      })
      .then((response) => {
        console.log("返回",response)
        switch (response.status) {
          case 200:
            resolve(response.data);
            break;
          case 401:
            Toast.info('验证失败，请重新登录')
            reject(response.data);
            break;
          case 400:
            Toast.info(response.data.message)
            reject(response.data);
            break;      
          case 500:
            Toast.info('服务器错误：'+response.status+'，接口：'+reqUrl)
            reject(response.data);
            break;
          default:
            Toast.info('服务器错误：'+response.status+'，接口：'+reqUrl)
            reject(response.data);
            break;
        }
      })
      .catch((error) => {
        Toast.info('服务器错误')
        console.warn(error)
        reject(error);
      });
    })
  }
}

