<template>
  <nav class="navbar navbar-light bg-light">
    <div class="container">
      <router-link
        class="navbar-brand fw-bold fs-4"
        to="/"
      >
        <img
          :src="require('../assets/image/logo.png')"
          alt="logo"
          style="width: 80px;"
        >
      </router-link>
      <div
        v-if="user == ''"
      >
        <div
          class="d-flex"
        >
          <router-link
            class="btn btn-primary shadow-sm fw-bold"
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
          <div class="mt-2 mx-2">
            반갑습니다, {{ user.email }}님!
          </div>
          <div class="dropdown">
            <button
              id="dropdownMenuButton1"
              class="btn btn-outline-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              더보기
            </button>
            <ul
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="dropdownMenuButton1"
            >
              <div v-if="profile">
                <li>
                  <router-link
                    class="dropdown-item"
                    :to="`/profile/${user.uid}`"
                  >
                    프로필
                  </router-link>
                </li>
              </div>
              <div v-if="setting">
                <li>
                  <router-link
                    class="dropdown-item"
                    :to="`/setting/${user.uid}`"
                  >
                    설정
                  </router-link>
                </li>
              </div>
              <li>
                <a
                  class="dropdown-item"
                  @click="logout"
                >로그아웃</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default ({
  name: 'Nav',
  props: {
    profile: {
      type: Boolean,
      default: true
    },
    setting: {
      type: Boolean,
      default: true
    }
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
    },
    logout () {
      const auth = getAuth()
      auth.signOut()
      this.$router.go()
    }
  }
})
</script>
