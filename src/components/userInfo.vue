<template>
    <div>
      <template v-if="logined">
        <div class="header">
          <span>个人信息</span>
        </div>
        <div class="container">
          <img class="user_img" :src="loginInfo.url? loginInfo.url : 'https://avatars0.githubusercontent.com/u/23630003?v=4&s=120'" alt="">
          <span class="user_name">{{loginInfo.user_name}}</span>
          <p>
            <i class="user_autograph">{{autograph}}</i>
          </p>
        </div>
        <div class="blank"></div>
        <div class="topic">
          <router-link to="/topic/create">
            <el-button type="success" >发布话题</el-button>
          </router-link>
        </div>
      </template>
      <template v-else>
        <div class="container">
          <p class="title">大昌哥中文交流社区</p>
          <p class="login">你可以选择 <router-link tag="span" to="/login" >登录</router-link> 或者 <router-link tag="span" to="/register">注册</router-link></p>
        </div>
      </template>

    </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  export default {
    name: 'userInfo',
    computed: {
      ...mapGetters([
        'loginInfo','logined'
      ]),
      autograph() {
        if(!this.loginInfo.autograph)
          return '这家伙很懒，什么个性签名都没有留下。';
        else
          return this.loginInfo.autograph;
      }
    }

  }
</script>

<style scoped lang="scss">
  .container{
  .user_img{
    width: 48PX;
    height: 48px;
    vertical-align: middle;
  }

  .user_name {
    padding-left: 10px;
    line-height: 48px;
  }
  .user_autograph{
    font-size: 14px;
    margin-top:  10px;
  }
  }
  .topic{
    background: #fff;
    padding: 10px 0;
  }
  .title{
    line-height: 30px;
    font-size: 16px;
    margin-bottom: 18px;
    color:#333;
  }
  .login{
    font-size: 12px;
    span{
      color: #778087;
      cursor: pointer;
    }
  }
</style>
