
import axios from 'axios';
import io from 'socket.io-client';
import {Notification} from 'element-ui'
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
        state.io.on('connect', (socket) => {
          console.log(socket);
        });
        state.io.on('c_hi', (data) => {
          console.log(data);
        });
        state.io.on('sendComment',(data) => {
          Notification({
            title: '提示',
            message: '你有一条新消息',
            duration: 0
          })
          console.log(data);
        })
        state.io.emit('loginin',state.loginInfo._id);
      }else{
        state.io.emit('loginin',state.loginInfo._id)
      }
      console.log(res,state);
    }
  }

}
