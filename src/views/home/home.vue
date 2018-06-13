<template>
    <div class="main_warpper">
      <div class="main">
        <div class="header menu">
            <span :class="{active: tab === 'all'}" @click="HandleTabChange('all')">全部</span>
            <span :class="{active: tab === type.type}" v-for="(type,index) in typeOptions" :key="index" @click="HandleTabChange(type.type)">{{type.name}}</span>
        </div>
      </div>
      <div class="aside">

      </div>
    </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      typeOptions: [],
      tab:'all'
    }
  },
  methods: {
    doQuery() {
      this.$http.post('/topic/queryTopicByType', {type: this.type})
        .then(res => {
          console.log(res);
        })
    },
    HandleTabChange(tab) {
      this.tab = tab;
    }
  },
  created() {
    this.$http.post('/topic/queryTopicType')
      .then(res => {
        if(res.code === 1){
          this.typeOptions = res.result;
        }
      });
    this.doQuery();
  }

}
</script>

<style scoped lang="scss">
  .header.menu{
    height: 19px;
    span{
      float: left;
      margin: 0 10px;
      color: #80BD1F;
      padding: 3px 4px;
      margin-top: -3px;
      border-radius: 3px;
      cursor: pointer;
      &:hover{
        color:#08557E;
      }
      &.active{
        color: #fff;
        background: #80BD1F;
      }
    }
  }
</style>
