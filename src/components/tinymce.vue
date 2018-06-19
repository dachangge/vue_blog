<template>
  <editor :id="id" v-model="tinymceHtml" :init="init"></editor>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/modern/theme'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
export default {
  name: 'tinymce',
  props: {
    height: {
      type: Number,
      default() {
        return 300
      }
    },
    content: {
      type: String,
      default() {
        return ''
      }
    },
    id: String
  },
  watch: {
    tinymceHtml(val) {
      this.$emit('update:content',val);
    },
    content(val){
      if(this.content !== this.tinymceHtml)
        this.tinymceHtml = this.content;
    }
  },
  data() {
    return {
      tinymceHtml: '',
      init: {
        language_url: '/static/tinymce/zh_CN.js',
        language: 'zh_CN',
        skin_url: '/static/tinymce/skins/lightgray',
        height: this.height,
        plugins: 'image link ',
        toolbar:
          'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | link unlink image code | removeformat',
        images_upload_handler:(blobInfo, success, failure) => {
          let fd = new FormData()
          fd.append('file',blobInfo.blob())
          this.$http.post('/file/upload',fd).then(res => {
            if(res.code === 1)
              success(res.result.url)
          })
            .catch(err => {

            })
        },
      }
    }
  },
  components: {
    Editor
  },
  methods: {

  },
  mounted() {
    tinymce.init({});
    this.tinymceHtml = this.content;
    console.log('!!!!!!!!!!!!!!!');
  }
}
</script>

<style scoped>

</style>
