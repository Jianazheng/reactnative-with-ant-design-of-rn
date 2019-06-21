import { observable, computed, action } from 'mobx';

class Public {
  constructor() {
    
  }
  @observable userData = {
    name:'binbin'
  }
  @computed get username(){
    return this.userData.name
  }
  @action editUsername(name:string){
    this.userData.name = name
  }
}

const publicStore = new Public()

export default publicStore