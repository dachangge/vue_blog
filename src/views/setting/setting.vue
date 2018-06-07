<template>
    <div >
      <div class="main">
        <div class="header">
          <router-link tag="span" to="/" class="router_link">主页</router-link>
          <span>\ 设置</span>
        </div>
        <el-form ref="form" :model="loginInfo" label-width="80px" style="max-width: 400px;margin: 20px auto 0;">
          <el-form-item label="用户名">
            <el-input class="register_input" v-model="loginInfo.user_name"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名">
            <el-input class="register_input" v-model="loginInfo.true_name"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input class="register_input" type="number" v-model="loginInfo.phone"></el-input>
          </el-form-item>
          <el-form-item label="个性签名">
            <el-input class="register_input" type="textarea" v-model="loginInfo.autograph"></el-input>
          </el-form-item>

          <el-button type="primary" @click="HandleSubmit">保存设置</el-button>
        </el-form>
      </div>
      <div class="aside">
        <div class="header">
          <span>个人信息</span>
        </div>
        <div class="container">
          <img class="user_img" :src="loginInfo.url? loginInfo.url : 'https://avatars0.githubusercontent.com/u/23630003?v=4&s=120'" alt="">
          <span class="user_name">{{user_name}}</span>
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
      </div>
      <div class="main mt-15">
        <div class="header">
          <span>更改密码</span>
        </div>
        <el-form ref="form1" :model="form1" label-width="80px" style="max-width: 400px;margin: 20px auto 0;">
          <el-form-item label="当前密码">
            <el-input class="register_input" v-model="form1.old_psd"></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input class="register_input" v-model="form1.new_psd"></el-input>
          </el-form-item>
          <el-button type="primary" @click="HandleChangePsd">更改密码</el-button>
        </el-form>
      </div>
    </div>
</template>

<script>
    export default {
      name: 'userInfo',
      data() {
        return {
          form1: {},
          loginInfo: {},
          user_name: '',
          autograph: ''
        }
      },
      methods: {
        HandleSubmit() {
          this.$http.post('/user/saveUser',this.loginInfo).then(res => {
            if(res.code === 1){
             this.changeMsg();
            }
          })
        },
        HandleChangePsd() {
          this.$http.post('/user/changePsd',this.form1).then(res => {

          })
        },
        changeMsg() {
          if(!this.loginInfo.autograph)
            this.autograph = '这家伙很懒，什么个性签名都没有留下。';
          else
            this.autograph = this.loginInfo.autograph;
          this.user_name = this.loginInfo.user_name;
        }
      },
      created() {
        this.$http.post('/user/checkUser').then(res => {
          if(res.code === 1){
            this.loginInfo = res.result;
            this.changeMsg();
          }
        })
      }

    }
</script>

<style lang="scss" scoped>
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
</style>
