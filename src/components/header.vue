<template>
   <el-row :gutter="10">
       <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
           <div class="nav-log">
               <img src="/public/images/vue.png" alt="">
           </div>
       </el-col>
   </el-row>
</template>
<script>
export default {
    name: 'header',
    data() {
        return {

        }
    },

}
</script>
<style lang="scss" scoped>
    .nav{
        height: 50px;
    }
</style>

