<template>
  <div>
    <Nav />
    <input
      v-model="title"
      type="text"
      class="form-control"
      placeholder="제목을 입력하세요."
    >
    <editor
      ref="toastuiEditor"
      height="750px"
    />
    <div class="d-grid gap-2 d-md-flex justify-content-md-end m-3">
      <router-link
        class="btn btn-outline-secondary me-md-2"
        type="button"
        to="/"
      >
        취소
      </router-link>
      <button
        class="btn btn-primary"
        type="button"
        @click="createPost"
      >
        글 작성
      </button>
    </div>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
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
      user: '',
      title: ''
    }
  },
  mounted () {
    this.checkAuth()
  },
  methods: {
    // TODO: html 태그 빼고 불러와서 보여주기
    checkAuth () {
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
        if (user == null) {
          this.$router.push('/login').catch(() => {})
          console.log('로그인 필요')
        }
      })
    },
    async createPost () {
      const db = getFirestore()
      const html = this.$refs.toastuiEditor.invoke('getHTML')
      if (html === '<p><br class="ProseMirror-trailingBreak"></p>') {
        this.$toast.error('내용을 입력해주세요!', {
          position: 'top-center'
        })
      } else {
        try {
          const docRef = await addDoc(collection(db, 'posts'), {
            title: this.title,
            content: html,
            createdAt: Date.now(),
            userUid: getAuth().currentUser.uid,
            userEmail: getAuth().currentUser.email
          })
          console.log('Document written with ID: ', docRef.id)
          this.$router.push('/').catch(() => {})
          this.$toast.success('글 작성 완료!', {
            position: 'top-center'
          })
        } catch (e) {
          console.error('Error adding document: ', e)
        }
      }
    }
  }
}
</script>

<style>

</style>
