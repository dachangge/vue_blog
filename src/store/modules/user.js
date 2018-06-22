
import axios from 'axios';
import io from 'socket.io-client';
export default{
  state: {
    loginInfo: {},
    io: null
  },
  getters: {
    logined: state => {
      if(state.loginInfo._id){
        return true
      }
      return false;
    },
    loginInfo: state => {
      return state.loginInfo;
    },
    io: state => state.io
  },
  actions: {
    getInfo({commit}){
      axios.post('/user/checkUser').then(res => {
        if(res.code === 1){
          commit("setlogininfo", res.result);
        }else{
          commit('setlogininfo', {})
        }
      })
    }
  },
  mutations:{
    setlogininfo(state,res) {
      state.loginInfo = res;
      if(!state.io){
        state.io = io('http://localhost:3000');
        state.io.on('connect', () => {

        });
        state.io.on('event', (data) => {

        });
        state.io.emit('hi',state.loginInfo._id);
      }else{
        state.io.emit('hi',state.loginInfo._id)
      }
      console.log(res,state);
    }
  }

}
