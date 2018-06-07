import axios from 'axios';
import {
  Message,
} from 'element-ui'

axios.defaults.timeout = 10000;
axios.defaults.withCredentials = true;

axios.interceptors.request.use((config) => {
  console.log(config)
  config.url = 'http://localhost:3000' + config.url;
  return config;
});

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
