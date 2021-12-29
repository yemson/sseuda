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
import { getFirestore, collection, addDoc } from 'firebase/firestore'

export default {
  data () {
    return {
      user: '',
      title: '',
      content: '',
      input: ''
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
      try {
        const docRef = await addDoc(collection(db, 'posts'), {
          title: this.title,
          content: this.content,
          createdAt: Date.now(),
          userUid: getAuth().currentUser.uid,
          userEmail: getAuth().currentUser.email
        })
        console.log('Document written with ID: ', docRef.id)
        this.$router.push('/').catch(() => {})
      } catch (e) {
        console.error('Error adding document: ', e)
      }
    }
  }
}
</script>

<style>

</style>
