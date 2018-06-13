<template>

  <div class="main_warpper">

    <div class="main" >
      <div class="main_top">
        <div class="main_header">
          <p class="header_title ellipsis">
            <span class="title_btn">{{btnTitle}}</span>
            {{item.title}}
          </p>
          <p class="title_desc">
            <span>发布于{{create_time}}</span>
            <span>作者{{item.userMsg.user_name}}</span>
            <span>{{item.looks}}次浏览</span>
            <span>来自 {{btnTitle}}</span>
          </p>
        </div>
        <hr>
        <div class="main_contianer tl" v-html="item.content">

        </div>
      </div>
      <div class="main_center" v-if="item.replay_arr && item.replay_arr.length > 0">
        <div class="header">
          <span> {{item.replay_arr.length}} 回复</span>
        </div>
        <ul class="replys_ul">
          <li v-for="(rep, index) in item.replay_arr" :key="index" >
            <div class="reply_msg">
              <img src="https://avatars0.githubusercontent.com/u/23630003?v=4&s=120" alt="">
              <span class="user_name">{{rep.userMsg ? rep.userMsg.user_name : 'zhazha'}}</span>
              <span class="reply_time">{{rep.create_time | hlbefore}}</span>
            </div>
            <div class="reply_content" v-html="rep.content">

            </div>
          </li>
        </ul>
      </div>
      <div class="main_bottom">
        <div class="header">
          <span>添加回复</span>
        </div>
        <div class="bottom_container">
          <tinymce :height="200" ref="editor" v-model="replyContent"></tinymce>
          <el-button class="mt-10 mb-10" type="success" @click="HandleReply">回复</el-button>
        </div>
      </div>

    </div>
    <div class="aside">
      <div class="header">
        <span>作者</span>
      </div>
      <div class="container">
        <img class="user_img" :src="item.userMsg.url? item.userMsg.url : 'https://avatars0.githubusercontent.com/u/23630003?v=4&s=120'" alt="">
        <span class="user_name">{{item.userMsg.user_name}}</span>
        <p>
          <i class="user_autograph">{{item.userMsg.autograph? item.userMsg.autograph: '这家伙很懒，什么个性签名都没有留下。'}}</i>
        </p>
      </div>
    </div>
  </div>

</template>

<script>
  import tinymce from '@/components/tinymce'
  import moment from 'moment'
  export default {
    name: 'topic',
    props: {
      id: String
    },
    data() {
      return {
        item: {
          userMsg: {}
        },
        replyContent: ''
      }
    },
    methods: {
      HandleReply() {
        this.$http.post('/comment/addComment',{_id: this.item._id,content: this.replyContent, type: 'topic', authid: this.item.user_id}).then(res => {
          console.log(res);
        })
      }
    },
    computed: {
      create_time() {
        if(this.item.create_time)
          return moment(this.item.create_time).format('YYYY-MM-DD HH:mm:ss');
        return '';
      },
      btnTitle() {
        if(this.item.type === 'share')
          return '分享';
        else if(this.item.type === 'question')
          return '提问';
        return '默认';
      },
    },
    components: {
      tinymce
    },
    created() {
      this.$http.post('/topic/queryTopicById',{id: this.id})
        .then(res => {
          console.log(res);
          if(res.code === 1){
            this.item = res.result;
          }
        })
    }
  }
</script>

<style scoped lang="scss">
  .main{
    box-sizing:border-box;
    background: transparent;
    text-align: left;
    .main_top{
      background: #fff;
    }
    .main_center{
      margin-top: 20px;
      .replys_ul{
        background: #fff;
        li{
          padding: 10px;
          border-bottom: 1px solid #F0F0F0;
          .reply_msg{
            img{
              width: 30px;
              height: 30px;
              vertical-align: top;
            }
            .user_name{
              display: inline-block;
              margin-top: 5px;
              color: #1389CA;
              cursor: pointer;
            }
            .reply_time{
              color: #666666;
              font-size: 12px;
              &:before{
                content: '•';
                margin-right: 2px;
              }
            }
          }
          .reply_content{
            padding-left: 40px;
            padding-top: 8px;
            font-size: 14px;
          }
        }
      }
    }

    .main_bottom{
      margin-top: 20px;
      background: #fff;
      .bottom_container{
        padding: 10px 20px;

      }
    }
    .main_header{
      padding: 10px 20px;
      .title_btn{
        background: #80bd01;
        padding: 2px 4px;
        border-radius: 3px;
        color: #fff;
        font-size: 12px;
      }
      color: #000;
      font-size: 22px;
      line-height: 30px;
      font-weight: 700;
      .title_desc{
        font-size: 12px;
        color: #838383;
        span{
          padding-right: 7px;
         &:before{
           content: "•";
           margin-right: 4px;
         }
        }
      }
    }
    .main_contianer{
      padding: 10px 20px;
      font-size: 15px;
      line-height: 24px;
    }
  }
  .aside{
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
  }
</style>
