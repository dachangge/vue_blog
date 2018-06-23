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
            <span>作者{{item.user_id.user_name}}</span>
            <span>{{item.looks}}次浏览</span>
            <span>来自 {{btnTitle}}</span>
          </p>
        </div>
        <hr>
        <div class="main_contianer tl" v-html="item.content">

        </div>
      </div>
      <div ref="replySection" class="main_center" v-if="item.replays && item.replays.length > 0">
        <div class="header">
          <span> {{item.replays.length}} 回复</span>
        </div>
        <ul class="replys_ul">
          <li v-for="(rep, index) in replays" :key="index" >
            <i class="el-icon-edit rt icon" @click="HandleReplytoReply(rep)"></i>
            <div class="reply_msg">
              <img :src="rep.user_id.header_url" alt="">
              <span class="user_name">{{rep.user_id ? rep.user_id.user_name : 'zhazha'}}</span>
              <span class="reply_time">{{rep.create_time | hlbefore}}</span>
            </div>
            <div class="reply_content" v-html="rep.content">

            </div>
            <div  class="addReply" v-show="Boolean(rep.showReply)">
              <editor :height="200" :content.sync="rep.replyContent"></editor>
              <el-button class="mt-10" type="primary" size="mini" @click="HandleReplyComment(rep)">回复</el-button>
            </div>
          </li>
        </ul>
      </div>
      <div class="main_bottom">
        <div class="header">
          <span>添加回复</span>
        </div>
        <div class="bottom_container">
          <editor :id="'reply'" :height="300" :content.sync="replyContent"></editor>
          <el-button class="mt-10 mb-10" type="success" @click="HandleReply">回复</el-button>
        </div>
      </div>

    </div>
    <div class="aside">
      <div class="header">
        <span>作者</span>
      </div>
      <div class="container">
        <img class="user_img" :src="item.user_id.header_url" alt="">
        <span class="user_name">{{item.user_id.user_name}}</span>
        <p>
          <i class="user_autograph">{{item.user_id.autograph? item.user_id.autograph: '这家伙很懒，什么个性签名都没有留下。'}}</i>
        </p>
      </div>
    </div>
  </div>

</template>

<script>
  import editor from '@/components/tinymce'
  import moment from 'moment'
  import {mapGetters} from 'vuex'
  export default {
    name: 'topic',
    props: {
      id: String,
    },
    data() {
      return {
        item: {
          user_id: {}
        },
        replyContent: '',
        addReply: '',
        replays: []
      }
    },
    methods: {
      HandleReply() {
        if(!this.logined){
          this.$message.error('请先注册/登录');
          return;
        }
        this.$http.post('/comment/addComment',{_id: this.item._id,content: this.replyContent, type: 'topic', authid: this.item.user_id._id,}).then(res => {
          console.log(res);
          if(res.code === 1){
            this.$message.success(res.description);
            res.result.user_id = this.loginInfo;
            this.$set(res.result,'showReply', false);
            this.replays.push(res.result);
            this.replyContent = '';
          }
        })
      },
      HandleReplytoReply(rep) {
        rep.showReply = true;
        rep.replyContent = `@${rep.user_id.user_name} `;
        rep.replyContent = `<p><font color="#1389CA">@${rep.user_id.user_name}</font></p><p></p>`;
        console.log(rep)
      },
      HandleReplyComment(rep) {
        console.log(rep.replyContent)
        this.$http.post('/comment/addComment',{_id: this.item._id, content: rep.replyContent, type: 'comment', authid: rep.user_id._id, target_id: rep._id,}).then(res => {
          console.log(res);
          if(res.code === 1){
            res.result.user_id = this.loginInfo;
            this.$set(res.result,'showReply', false);
            this.replays.forEach(it => {it.showReply = false;})
            this.replays.push(res.result);
          }
        })
      }
    },
    computed: {
      ...mapGetters([
        'loginInfo','logined'
      ]),
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
      }
    },
    components: {
      editor
    },
    mounted() {
      console.log(this.$route, this);
      if(this.$route.query.readReply){
        setTimeout(() => {
          window.scrollTo(0,this.$refs.replySection.offsetTop)
        },1000)
      }
    },
    created() {
      this.$http.post('/topic/queryTopicById',{id: this.id})
        .then(res => {
          console.log(res);
          if(res.code === 1){
            this.item = res.result;
            this.replays = this.item.replays;
            this.replays.forEach(it => {
              this.$set(it,'showReply', false);
            })
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
          .addReply{
            padding-top: 12px;
            padding-left: 43px;
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
