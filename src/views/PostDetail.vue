<template>
  <div>
    {{ post.title }}
    {{ post.content }}
  </div>
</template>

<script>
import { doc, getDoc, getFirestore } from 'firebase/firestore'

export default {
  data () {
    return {
      post: {}
    }
  },
  mounted () {
    this.postDeteil()
  },
  methods: {
    async postDeteil () {
      const db = getFirestore()
      const post = await getDoc(doc(db, `posts/${this.$route.params.id}`))
      console.log(post.data())
      this.post = post.data()
    }
  }
}
</script>

<style>

</style>
