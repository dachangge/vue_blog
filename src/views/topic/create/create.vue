<template>

  <div class="main_warpper">
    <div class="main" >
      <div class="header">
        <router-link tag="span" to="/" class="router_link">主页</router-link>
        <span>\ 登陆</span>
      </div>
      <div class="main_contianer tl">
        <el-form>
          <el-form-item label="选择板块： " label-width="100px">
            <el-select v-model="type" placeholder="请选话题模块">
              <el-option v-for="(opt, index) of typeOptions" :key="index" :label="opt.name" :value="opt.type"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label=""  class="defineItem">
            <el-input type="text" v-model="title" placeholder="标题字数十字以上"></el-input>
          </el-form-item>
        </el-form>
        <editor :height="350" :content.sync="content"></editor>
        <el-button type="success" class="submitBtn" @click="HandleSubmit">提交</el-button>
      </div>
    </div>
    <div class="aside">
      <div class="header">
        <span>话题发布指南</span>
      </div>
      <div class="container">
        <p>whc的论坛</p>
        <!--<p>在这里你可以：</p>-->
        <ul>
          <li>尽量把话题要点浓缩到标题里</li>
          <li>尽量把话题要点浓缩到标题里</li>
          <li>尽量把话题要点浓缩到标题里</li>
          <li>尽量把话题要点浓缩到标题里</li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
import editor from '@/components/tinymce';

export default {
  name: 'create',
  data() {
    return {
      content: '',
      type: null,
      title: '',
      typeOptions: []
    }
  },
  methods: {
    HandleSubmit() {
      console.log(this.content);
      this.$http.post('/topic/insertTopic',{content: this.content, type: this.type, title: this.title})
        .then(res => {
          if(res.code === 1){
            // console.log(res);
            this.$router.push({path:`/topic/${res.result._id}`});
          }
        })
    }
  },
  components: {
    editor
  },
  created() {
    this.$http.post('/topic/queryTopicType')
      .then(res => {
        if(res.code === 1){
          this.typeOptions = res.result;
        }
      })
  }
}
</script>

<style >

  .main_contianer{
    margin-top: 20px;
  }
  .createTopic .mce-tinymce{
    border: none;
    margin: 0 20px;
    max-width: calc(100% - 40px);

  }
  .defineItem{
    margin: 0 20px 10px 20px;
  }
  .submitBtn{
    margin-top: 20px;
    margin-left: 20px;
  }
</style>
