<template>
  <div class="main_warpper">
    <div class="main" >
      <div class="main_top">
        <div class="header">
          <router-link tag="span" to="/" class="router_link">主页</router-link>
          <span>\ 新消息</span>
        </div>
        <ul class="message_ul" v-if="unreadMessages && unreadMessages.length > 0">
          <li v-for="(message, index) in unreadMessages" :key="index">
            <router-link tag="span" :to="'/user'+message.user_id._id" class="link">{{message.user_id.user_name}}</router-link>
            <template v-if="message.parent_type === 'comment'">
              回复了你在话题
              <span @click="HandleReadMessage(message)" class="link" >{{message.topic_id.title}}</span>
              的评论
            </template>
            <template v-if="message.parent_type === 'topic'">
              回复了你的话题
              <span @click="HandleReadMessage(message)" class="link">{{message.topic_id.title}}</span>
            </template>
          </li>
        </ul>
        <div class="nomessage" v-else>
          无消息
        </div>
      </div>
      <div class="main_bottom mt-15">
        <div class="header">
          <span>过往信息</span>
        </div>
        <div class="container">
          <ul class="message_ul" v-if="readMessages && readMessages.length > 0">
            <li v-for="(message, index) in readMessages" :key="index">
              <span class="link">{{message.user_id.user_name}}</span>
              <template v-if="message.parent_type === 'comment'">
                回复了你在
                <span class="link">{{message.topic_id.title}}</span>
                的话题
              </template>
              <template v-if="message.parent_type === 'topic'">
                回复了你的话题
                <span class="link">{{message.topic_id.title}}</span>
              </template>
            </li>
          </ul>
          <div class="nomessage" v-else>
            无消息
          </div>
        </div>
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
    name: 'message',
    data() {
      return {
        messages: []
      }
    },
    methods: {
      HandleReadMessage(message){
        console.log(message);
        this.$http.post('/comment/readComment',{id: message._id})
          .then(res => {
            console.log(res);
            if(res.code === 1){
              this.$store.dispatch('readMessage');
              this.$router.push({
                path:`/topic/${message.topic_id._id}`,
                query: {readReply: true}
              })
            }
          })
      }
    },
    components: {
      userInfo
    },
    computed: {
      unreadMessages() {
        return this.messages.filter(it => !it.status);
      },
      readMessages() {
        return this.messages.filter(it => it.status);
      }
    },
    created() {
      this.$http.post('/comment/queryCommentByUserId').then(res => {
        console.log(res);
        if(res.code === 1){
          this.messages = res.result;
        }
      })
    }
  }

</script>

<style scoped lang="scss">
  .main{
    background: transparent;
    .main_top{
      background: #fff;
    }
    .main_bottom{
      background: #fff;
      .container{

      }
    }
  }
  .message_ul{
    text-align: left;
    li{
      padding: 10px;
      border-bottom: 1px solid #f0f0f0;
    }
  }
  .nomessage{
    padding: 10px;
    padding-bottom: 30px;
    text-align: left;
  }


</style>
