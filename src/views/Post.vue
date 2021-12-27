<template>
  <div class="container">
    <div class="input-group my-3">
      <input
        v-model="title"
        type="text"
        class="form-control"
        placeholder="제목을 입력하세요."
      >
    </div>
    <div class="input-group">
      <textarea
        v-model="content"
        class="form-control"
      />
    </div>
    <button
      class="btn btn-primary btn-lg btn-block mt-2"
      type="button"
      @click="createPost"
    >
      글 작성
    </button>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getDatabase, ref, set } from 'firebase/database'

export default {
  data () {
    return {
      user: '',
      title: '',
      content: ''
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
    createPost () {
      const auth = getAuth()
      const db = getDatabase()
      const postsRef = ref(db, 'posts')
      const post = {
        title: this.title,
        content: this.content,
        user: auth.currentUser.email,
        createdAt: Date.now()
      }
      set(postsRef, post)
        .then(() => {
          this.$router.push('/').catch(() => {})
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.log(errorCode, errorMessage)
        })
    }
  }
}
</script>

<style>

</style>
