import axios from 'axios';
import {
  Message,
} from 'element-ui'

axios.interceptors.response.use((res) => {
  if(res.data.code === 1){
    Message({
      type: 'success',
      message: res.data.description,
      duration: 5000,
      showClose: true
    });
    return res.data;
  }else{
    Message({
      type: 'error',
      message: res.data.description,
      duration: 5000,
      showClose: true
    });
    return res.data;
  }
})
