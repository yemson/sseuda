<template>
  <div>
    <Nav :profile="false" />
    {{ user.displayName }} |
    {{ user.email }} |
    <img :src="user.photoURL"> |
    {{ user.uid }}
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Nav from '../components/Nav.vue'

const auth = getAuth()

export default {
  name: 'Profile',
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
