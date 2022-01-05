<template>
  <div>
    <Nav />
    <input
      v-model="title"
      type="text"
      class="form-control"
      placeholder="제목을 입력하세요."
    >
    <v-md-editor
      v-model="text"
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
import { marked } from 'marked'
import Nav from '../components/Nav.vue'

export default {
  components: {
    Nav
  },
  data () {
    return {
      title: '',
      text: ''
    }
  },
  mounted () {
    this.checkAuth()
  },
  methods: {
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
      const html = marked.parse(this.text)
      if (html === '') {
        this.$toast.error('내용을 입력해주세요!', {
          position: 'top-center'
        })
      } else {
        try {
          const docRef = await addDoc(collection(db, 'posts'), {
            title: this.title,
            content: html,
            likes: [],
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
