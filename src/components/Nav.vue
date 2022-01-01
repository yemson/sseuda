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
        v-if="user == ''"
      >
        <div
          class="d-flex"
        >
          <router-link
            class="btn btn-primary rounded-0"
            to="/login"
          >
            로그인
          </router-link>
        </div>
      </div>
      <div v-else>
        <div
          class="d-flex"
        >
          <button
            class="btn btn-primary rounded-0"
            @click="logout"
          >
            로그아웃
          </button>
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
    },
    logout () {
      const auth = getAuth()
      auth.signOut()
      this.$router.go()
    }
  }
})
</script>
