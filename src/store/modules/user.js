
import axios from 'axios';
export default{
  state: {
    loginInfo: {},
  },
  getters: {
    logined: state => {
      if(state.loginInfo._id){
        return true
      }
      return false;
    }
  },
  actions: {
    getInfo({commit}){
      axios.post('/user/checkUser').then(res => {
        if(res.code === 1){
          commit("setlogininfo", res.result);
        }
      })
    }
  },
  mutations:{
    setlogininfo(state,res) {
      state.loginInfo = res;
      console.log(res,state);
    }
  }

}
