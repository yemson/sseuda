<template>
  <nav
    class="navbar navbar-light"
    style="background-color: #ffffff"
  >
    <div class="container">
      <router-link
        class="navbar-brand fw-bold fs-4"
        to="/"
      >
        <img
          :src="require('../assets/image/logo.svg')"
          alt="logo"
          width="30px"
        >
        sseuda
      </router-link>
      <div v-if="!hide">
        <div
          v-if="user === ''"
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
            <div class="mt-2 mx-2 fw-bold">
              반갑습니다, {{ user.displayName }}님!
            </div>
            <div class="dropdown">
              <button
                id="dropdownMenuButton1"
                class="btn btn-outline-secondary dropdown-toggle fw-bold"
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
                      class="dropdown-item fw-bold"
                      :to="`/profile/${user.uid}`"
                    >
                      프로필
                    </router-link>
                  </li>
                </div>
                <div v-if="setting">
                  <li>
                    <router-link
                      class="dropdown-item fw-bold"
                      :to="`/setting/${user.uid}`"
                    >
                      설정
                    </router-link>
                  </li>
                </div>
                <li>
                  <a
                    class="dropdown-item fw-bold"
                    @click="logout"
                  >로그아웃</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const auth = getAuth()

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
    },
    hide: {
      type: Boolean,
      default: false
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
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user
        }
      })
    },
    logout () {
      auth.signOut()
      this.$router.go()
    }
  }
})
</script>
