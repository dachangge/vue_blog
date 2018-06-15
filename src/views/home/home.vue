<template>
    <div class="main_warpper">
      <div class="main">
        <div class="header menu">
            <span :class="{active: tab === 'all'}" @click="HandleTabChange('all')">全部</span>
            <span :class="{active: tab === type.type}" v-for="(type,index) in typeOptions" :key="index" @click="HandleTabChange(type.type)">{{type.name}}</span>
        </div>
        <div class="topic_list">
          <ul>
            <li class="topic_li" v-for="(topic, index) in topicItems" :key="index">
              <span class="crently_time rt">
                {{topic.recently_reply_time | hlbefore}}
              </span>
              <img :src="topic.user_id.url" alt="" class="topic_user">
              <div class="replyCount">
                <span title="回复数" class="reply">{{topic.replays.length}} /</span>
                <span title="点击数">{{topic.looks}}</span>
              </div>
              <span class="topic_title ellipsis">
                <span class="type">{{topic.typeName}}</span>
                <router-link tag="span" :to="'/topic/'+topic._id">{{topic.title}}</router-link>
              </span>
            </li>
          </ul>
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="pager.pagerNumber"
              :page-size="25"
              layout=" prev, pager, next"
              :total="pager.count">
            </el-pagination>
        </div>
      </div>
      <div class="aside">
        <userInfo></userInfo>
      </div>
    </div>
</template>

<script>
import  userInfo from '@/components/userInfo'
import {mapGetters} from 'vuex';
export default {
  name: 'home',
  data() {
    return {
      typeOptions: [],
      tab:'all',
      topicItems: [],
      pager: {
        pagerNumber: 1,
        pagerSize: 25,
        count: 100
      }
    }
  },
  methods: {
    getTypeName(type) {
      let item = this.typeOptions.find( it => it.type === type);
      if(item)
        return item.name;
      return '';
    },
    doQuery() {
      this.$http.post('/topic/queryTopicByType', Object.assign({type: this.tab}, this.pager))
        .then(res => {
          console.log(res);
          if(res.code === 1){
            this.topicItems = res.result.list;
            this.pager.count = res.result.count;
            res.result.list.forEach(it => {
              it.typeName = this.getTypeName(it.type);
            })
            console.log(res.result)
          }
        })
    },
    HandleTabChange(tab) {
      this.tab = tab;
      this.doQuery();
    },
    HandleTopicClick(_id) {

    },
    handleCurrentChange(page) {
      this.pager.pagerNumber = page;
      this.doQuery();
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
  },
  components: {
    userInfo
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
  .topic_list{
    .topic_li{
      padding: 10px;
      height: 30px;
      text-align: left;
      border-bottom: 1px solid #F0F0F0;
      .crently_time{
        line-height: 30px;
        font-size: 12px;
        color: #b4b4b4;
      }
      .topic_title{
        display: inline-block;
        vertical-align: middle;
        max-width: calc(100% - 180px);
        font-size: 15px;
        cursor: pointer;
        &:hover{
          text-decoration: underline;
        }
        span.type{
          background-color: #e5e5e5;
          color: #999;
          padding: 2px 4px;
          font-size: 12px;
          display: inline-block;
          margin-right: 3px;
          border-radius: 4px;
        }
      }
      &:hover{
        background: #F5F5F5;
      }
      .topic_user{
        width: 30px;
        height: 30px;
        vertical-align: middle;
        cursor: pointer;
      }
      .replyCount{
        display: inline-block;
        width: 60px;
        text-align: center;
        span{
          line-height: 30px;
          color: #b4b4b4;
          font-size: 12px;
          &.reply{
            color: #9e78c0;
            font-size: 14px;
          }
        }

      }


    }
  }
</style>
