<template>
   <el-row :gutter="10" class="nav">
       <el-col :xs="24" :sm="6" :md="5" :lg="5">
           <div class="nav-logo">
             <router-link to="/">
               <img src="../assets/image/logo.png"  alt="">
             </router-link>
           </div>
       </el-col>
       <el-col :xs="24" :sm="12" :md="8" :lg="8">
         <el-input class="nav-search"  placeholder="请输入内容" v-model="seachValue" clearable>
           <i
             class="el-icon-search el-input__icon"
             slot="prefix"
           >
           </i>
         </el-input >
       </el-col>
     <el-col :xs="24" :sm="24" :md="11" :lg="11">
        <ul class="nav-tabs rt">
          <router-link tag="li" to="/"  class="lt">首页</router-link>
          <router-link tag="li" :to="'/about'" class="lt" >关于</router-link>
          <router-link v-if="!logined" tag="li" :to="'/login'" class="lt">登陆</router-link>
          <router-link v-if="!logined" tag="li" :to="'/register'" class="lt">注册</router-link>
          <router-link v-if="logined" tag="li" :to="'/message'" class="lt" style="position: relative">
              未读消息
            <sup class="messageNum" v-if="unreadMessageNum > 0">{{unreadMessageNum}}</sup>
          </router-link>
          <router-link v-if="logined" tag="li" :to="'/setting'" class="lt">设置</router-link>
          <li class="lt" v-if="logined" @click="HandleLoginout">退出</li>
        </ul>
     </el-col>
   </el-row>
</template>
<script>
  import {mapGetters} from 'vuex'
export default {
    name: 'appHeader',
    data() {
        return {
          seachValue: ''
        }
    },
    computed:{
      ...mapGetters([
        'logined','unreadMessageNum'
      ])
    },
  methods: {
    show() {
      console.log(this.logined)
    },
    HandleLoginout() {
      this.$http.post('/user/loginOut').then(res => {
        if(res.code === 1){
          this.$store.dispatch('getInfo');
          this.$router.push('/');
        }
      })
    }
  },
    created() {
      this.$store.dispatch('getInfo', true);
    }

}
</script>
<style lang="scss" scoped>
  .nav-logo{
    cursor: pointer;
  }
  .messageNum{
    position: absolute;
    top: 0;
    right: 8px;
    color: #fff;
    font-size: 12px;
    background: #f56c6c;
    height: 18px;
    line-height: 18px;
    padding: 1px 5px;
    border-radius: 9px;
  }
</style>

