<template>
    <div>
      <mavon-editor ref="md" :subfield="false" :toolbars="toolbars" @imgAdd="imgAdd" @imgDel="imgDel" v-model="content"></mavon-editor>
    </div>
</template>

<script>

export default {
  name: 'markdown',
  data() {
    return {
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        preview: true, // 预览
        subfield: true, // 单双栏模式
      }
    }
  },
  props: {
    content: String
  },
  watch: {
    content(val,oldVal) {
      console.log(val);
      this.$emit('update:content', val);
    }
  },
  methods: {
    imgAdd(pos, file) {
      console.log(pos,file);
      let formData = new FormData();
      formData.append('file',file);
      this.$http.post('/file/upload',formData,{header: {'Content-Type': 'multipart/form-data'}})
        .then(res => {
          if(res.code === 1){
            console.log(this.$refs['md'])
            this.$refs['md'].$img2Url(pos,res.result.url)
          }
        })
    },
    imgDel() {

    }
  }
}
</script>

<style scoped>

</style>
