<template>
  <div class="main_warpper">
    <div class="main" >
      <div class="header">
        <router-link tag="span" to="/" class="router_link">主页</router-link>
        <span>\ </span>
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
export default {
  name: 'user',
  props: {
    id: Number
  }

}
</script>

<style scoped>

</style>
