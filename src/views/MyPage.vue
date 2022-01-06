<template>
  <div>
    <Nav :my-page="false" />
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Nav from '../components/Nav.vue'

export default {
  name: 'MyPage',
  components: {
    Nav
  },
  data () {
    return {
      user: ''
    }
  },
  mounted () {
    this.checkAuth()
  },
  methods: {
    checkAuth () {
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user
        }
      })
    }
  }
}
</script>

<style>

</style>
