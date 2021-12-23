<template>
  <div>
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
    <div
      class="card"
      style="width: 30rem; height: 28rem; margin: 0 auto; margin-top: 4em;"
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
            class="form-control"
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
            class="form-control"
            placeholder="비밀번호 입력"
          >
        </div>
        <div
          class="d-grid gap-2 mx-3"
          style="margin-top: 2.5rem;"
        >
          <button
            class="btn btn-primary mb-2"
            type="button"
            @click="login"
          >
            로그인
          </button>
          <router-link
            class="btn btn-outline-primary"
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
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'

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
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          this.$router.push('/')
        })
        .catch(error => {
          alert(error.message)
        })
    },
    checkAuth () {
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.$router.push('/')
        }
      })
    }
  }
}
</script>

<style>
  .card {
    border: none;
    border-radius: 0;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  }
</style>
