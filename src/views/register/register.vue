<template>
  <div>
    <div class="main" >
      <div class="header">
        <router-link tag="span" to="/" class="router_link">主页</router-link>
        <span>\ 注册</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px" style="max-width: 400px;margin: 20px auto 0;">
        <el-form-item label="用户名">
          <el-input class="register_input" v-model="form.user_name"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input class="register_input" v-model="form.true_name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input class="register_input" type="password" v-model="form.pass_word"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input class="register_input" type="password" v-model="form.pass_word_confirm"></el-input>
        </el-form-item>

        <el-form-item label="手机号">
          <el-input class="register_input" type="number" v-model="form.phone"></el-input>
        </el-form-item>
        <el-button type="primary" @click="HandleSubmit">新用户注册</el-button>
      </el-form>
    </div>
    <div class="aside">
      <div class="header">
        <span>关于</span>
      </div>
      <div class="container">
        <p>whc的论坛</p>
        <p>在这里你可以：</p>
        <ul>
          <li>向别人提出你遇到的问题</li>
          <li>向别人提出你遇到的问题</li>
          <li>向别人提出你遇到的问题</li>
          <li>向别人提出你遇到的问题</li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'register',
  data() {
    return {
      form: {}
    }
  },
  methods: {
    HandleSubmit() {
      console.log(this.form);
      this.$http.post('/user/create', this.form)
        .then(res => {
          console.log(res);
        })
    }
  },
  created() {
    this.$http.get('/user/show',)
      .then(res => {
        console.log(res);
      })
  }
}

</script>

<style scoped lang="scss">
  .register{
    background:#fff;
    padding-bottom: 20px;
    .register_input{
      max-width: 250px;
    }
  }


</style>
