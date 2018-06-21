<template>
    <div class="main_warpper">
      <div class="main">
        <div class="header">
          <router-link tag="span" to="/" class="router_link">主页</router-link>
          <span>\ 设置</span>
        </div>
        <div class="current_avatar">
          <span>当前头像</span>
          <img  :src="loginInfo.header_url" alt="">
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

      <div class="main mt-15">
        <div class="header">
          <span>头像上传</span>
        </div>
        <div class="avatar_container">

          <el-upload
            ref="upload"
            class="avatar-uploader"
            action="/user/headerUrlUpload"
            :data="{_id: this.loginInfo._id}"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :accept="'image/jpeg,image/png'"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

        </div>

      </div>

    </div>
</template>

<script>
  import {ImageUpload , ImagePreview} from 'vue-image-upload-preview'
  import {mapGetters} from 'vuex'
  export default {
      name: 'userInfo',
      data() {
        return {
          form1: {},
          loginInfo: {},
          user_name: '',
          autograph: '',
          imageUrl: '',
          // data: {
          //   _id: this.loginInfo._id
          // }
        }
      },
      components:{
        ImagePreview,
        ImageUpload
      },

      methods: {
        handleAvatarSuccess(res, file) {
          this.imageUrl = res.result;
          this.loginInfo.header_url = res.result;
          this.$store.dispatch('getInfo');
        },
        beforeAvatarUpload(file) {
          const isLt2M = file.size / 1024 / 1024 < 2;
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return  isLt2M;
        },
        HandleSubmit() {
          this.$http.post('/user/saveUser',this.loginInfo).then(res => {
            if(res.code === 1){
              this.$store.dispatch('getInfo');
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
  .avatar_container{
    margin-top: 15px;
  }
  .current_avatar{
    width: 400px;
    margin: 20px auto;
    text-align: left;
    span{
      font-size: 14px;
      color: #606266;
      display: inline-block;
      width: 68px;
      text-align: right;
      padding-right: 12px;
    }
    img{
      width: 60px;
      height: 60px;
      vertical-align: top;
    }
  }

</style>
