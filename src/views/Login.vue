<template>
  <div class="random-bg">
    <nav class="navbar navbar-light bg-light">
      <div class="container">
        <router-link
          class="navbar-brand"
          to="/"
        >
          sseuda
        </router-link>
      </div>
    </nav>
    <!-- TODO: 반응형 필요 -->
    <div
      class="card shadow-sm rounded-0"
      style="width: 30em; height: 28em; margin: 0 auto; margin-top: 4em;"
    >
      <div
        class="card-body"
        style="text-align: left;"
      >
        <div
          class="card-title; mx-3 mt-2"
          style="font-size: 2.5em;"
        >
          로그인
        </div>
        <div
          class="mx-3"
          style="margin-top: 2rem;"
        >
          <label
            for="emailInput"
            class="form-label"
          >이메일</label>
          <input
            id="emailInput"
            v-model="email"
            type="email"
            class="form-control rounded-0"
            placeholder="이메일 입력"
          >
        </div>
        <div
          class="mx-3"
          style="margin-top: 1.5rem;"
        >
          <label
            for="passwordInput"
            class="form-label"
          >비밀번호</label>
          <input
            id="passwordInput"
            v-model="password"
            type="password"
            class="form-control rounded-0"
            placeholder="비밀번호 입력"
          >
        </div>
        <div
          class="d-grid gap-2 mx-3"
          style="margin-top: 2.5rem;"
        >
          <button
            class="btn btn-primary mb-2 rounded-0"
            type="button"
            @click="login"
          >
            로그인
          </button>
          <router-link
            class="btn btn-outline-primary rounded-0"
            type="button"
            to="/register"
          >
            회원가입
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, setPersistence, browserSessionPersistence } from 'firebase/auth'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  mounted () {
    this.checkAuth()
  },
  methods: {
    login () {
      const auth = getAuth()
      setPersistence(auth, browserSessionPersistence)
        .then(() => {
          signInWithEmailAndPassword(auth, this.email, this.password)
            .then(() => {
              this.$router.push('/').catch(() => {})
              this.$toast.success('로그인 성공!', {
                position: 'top-center'
              })
            })
            .catch(() => {
              this.password = ''
              this.$toast.error('아이디와 비밀번호를 확인해 주세요!', {
                position: 'top-center'
              })
            })
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.log(errorCode, errorMessage)
        })
    },
    checkAuth () {
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.$router.push('/').catch(() => {})
        }
      })
    }
  }
}
</script>

<style scoped>
  .random-bg {
    background-image: url('https://picsum.photos/1920/1080?grayscale&blur=10');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh;
  }
</style>
