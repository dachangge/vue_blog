<template>
  <div class="main_warpper">
    <div class="main" >
      <div class="header">
        <router-link tag="span" to="/" class="router_link">主页</router-link>
        <span>\ 关于</span>
      </div>
      <div class="container">
        <h3>关于</h3>
        <p>大昌哥 社区为国内最大最具影响力社区，致力于学术研究。

          大昌哥 社区由一个刷个发起，目前已经吸引了无数人员加入，我们非常欢迎更多感兴趣的朋友。</p>
      </div>
    </div>
    <div class="aside">
      <userInfo></userInfo>
    </div>
  </div>

</template>

<script>
  import userInfo from '@/components/userInfo'
  export default {
    name: 'about',
    data() {
      return {
      }
    },
    methods: {

    },
    components: {
      userInfo
    },
    created() {

    }
  }

</script>

<style scoped lang="scss">
  .container{
    padding: 10px;
    text-align: left;
    h3{
      font-size: 24.5px;
      margin-bottom: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
    }
    p{
      font-size: 15px;
      line-height: 24px;
    }
  }
</style>
