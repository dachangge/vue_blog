<template>

  <tinymce :height=400 ref="editor" v-model="content"></tinymce>
</template>

<script>
import tinymce from '@/components//tinymce'

export default {
  name: 'create',
  data() {
    return {
      content: ''
    }
  },
  components: {
    tinymce
  }
}
</script>

<style scoped>

</style>
