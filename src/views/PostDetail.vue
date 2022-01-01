<template>
  <div>
    <Nav />
    <div class="container">
      <h1
        class="mt-4"
        style="display: inline-flex"
      >
        {{ post.title }}
      </h1>
      <div
        class="mt-4"
        style="float: right; display: inline-block"
      >
        <p class="text-muted">
          작성자: {{ post.userEmail }}
        </p>
        <p class="text-muted">
          작성일: {{ post.createdAt | moment("YYYY년 MMMM Do, dddd") }}
        </p>
      </div>
      <v-md-preview
        :text="postContent"
      />
    </div>
  </div>
</template>

<script>
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import Turndown from 'turndown'
import Nav from '../components/Nav.vue'

export default {
  components: {
    Nav
  },
  data () {
    return {
      post: {},
      postContent: ''
    }
  },
  mounted () {
    this.postDetail()
  },
  methods: {
    async postDetail () {
      const db = getFirestore()
      const post = await getDoc(doc(db, `posts/${this.$route.params.id}`))
      const turndownService = new Turndown()
      const html = turndownService.turndown(post.data().content)
      // console.log(html)
      this.post = post.data()
      this.postContent = html
    }
  }
}
</script>

<style>

</style>
