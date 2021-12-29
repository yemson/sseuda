<template>
  <div>
    <Nav />
    <button @click="getHTML">
      asdf
    </button>
    <editor
      ref="toastuiEditor"
      height="850px"
    />
  </div>
</template>

<script>
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/vue-editor'
import Nav from '../components/Nav.vue'

export default {
  components: {
    editor: Editor,
    Nav
  },
  data () {
    return {
    }
  },
  methods: {
    // TODO: html 태그 빼고 불러와서 보여주기
    // TODO: 이대로 firestore에 올리기
    getHTML () {
      const html = this.$refs.toastuiEditor.invoke('getHTML')
      console.log(html)
    }
  }
}
</script>

<style>

</style>
