<template>
    <div class="register" >
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
        <el-button type="primary" @click="HandleSubmit">注册</el-button>
      </el-form>

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
      this.$http.post('http://localhost:3000/user/create', this.form)
        .then(res => {
          console.log(res);
        })
    }
  },
  created() {
    this.$http.get('http://localhost:3000/user/show',)
      .then(res => {
        console.log(res);
      })
  }
}

</script>

<style scoped>
  .register{
    background:#fff;
    .header{
      padding: 10px;
      background-color: #f6f6f6;
      border-radius: 3px 3px 0 0
    }
    .register_input{
      max-width: 250px;
    }
  }

</style>
