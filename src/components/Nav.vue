<template>
  <nav class="navbar navbar-light bg-light">
    <div class="container">
      <router-link
        class="navbar-brand"
        to="/"
      >
        sseuda
      </router-link>
      <div
        v-if="user.uid == null"
      >
        <div
          class="d-flex"
        >
          <router-link
            class="btn btn-primary"
            to="/login"
          >
            로그인
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default ({
  name: 'Nav',
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
})
</script>
