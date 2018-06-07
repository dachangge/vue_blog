<template>
   <el-row :gutter="10" class="nav">
       <el-col :xs="24" :sm="6" :md="5" :lg="5">
           <div class="nav-logo">
               <img src="../assets/image/logo.png"  alt="">
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
          <li class="lt">首页</li>
          <li class="lt">分享</li>
          <li class="lt">提问</li>
          <li class="lt">关于</li>
          <li class="lt" v-if="!logined" @click="show">登陆</li>
          <router-link v-if="!logined" tag="li" :to="'/register'" class="lt">注册</router-link>
          <li class="lt"  v-if="logined">设置</li>
          <li class="lt" v-if="logined">退出</li>
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
        'logined'
      ])
    },
  methods: {
    show() {
      console.log(this.logined)
    }
  },
    created() {
      this.$store.dispatch('getInfo');
    }

}
</script>
<style lang="scss" scoped>

</style>

