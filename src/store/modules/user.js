
import axios from 'axios';
import io from 'socket.io-client';
import {Notification} from 'element-ui'
export default{
  state: {
    loginInfo: {},
    io: null,
    unreadMessageNum: 0
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
    io: state => state.io,
    unreadMessageNum: state => state.unreadMessageNum
  },
  actions: {
    getInfo({commit},value){
      axios.post('/user/checkUser').then(res => {
        if(res.code === 1){
          commit("setlogininfo", res.result);
          if(value){
            axios.post('/comment/queryCommentByUserId',{unread: true})
              .then(r => {
                if(r.code === 1){
                  commit("setunreadMessageNum", r.result.filter(it => !it.status).length);
                }
              })
          }
        }else{
          commit('setlogininfo', {})
        }
      })
    },
    readMessage({commit}){
      commit('reduceUnreadMessage')
    }
  },
  mutations:{
    reduceUnreadMessage(state){
      state.unreadMessageNum --;
    },
    setunreadMessageNum(state, res) {
      state.unreadMessageNum = res;
    },
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
          Notification.info({
            title: '消息',
            message: '你有一条未读消息',
            duration: 0
          })
          state.unreadMessageNum ++;
        })
        state.io.emit('loginin',state.loginInfo._id);
      }else{
        state.io.emit('loginin',state.loginInfo._id)
      }
      console.log(res,state);
    }
  }

}
