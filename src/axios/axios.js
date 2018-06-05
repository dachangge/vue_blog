import axios from 'axios';

axios.interceptors.response.use((res) => {
  if(res.code === 1){
    return res.data;
  }
})
