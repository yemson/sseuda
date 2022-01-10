<template>
  <div>
    <Nav :hide="true" />
    <div
      class="card"
      style="width: 30rem; height: 40rem; margin: 4em auto 0;"
    >
      <div
        class="card-body"
        style="text-align: left;"
      >
        <div
          class="card-title; mx-3 mt-2 fw-bold"
          style="font-size: 2.5em;"
        >
          회원가입
        </div>
        <div
          class="mx-3"
          style="margin-top: 2rem;"
        >
          <label
            for="emailInput"
            class="form-label fw-bold"
          >이메일</label>
          <input
            id="emailInput"
            v-model="emailInput"
            type="email"
            class="form-control shadow-sm fw-bold"
            placeholder="이메일 입력"
          >
        </div>
        <div
          class="mx-3"
          style="margin-top: 2rem;"
        >
          <label
            for="displayInput"
            class="form-label fw-bold"
          >닉네임</label>
          <input
            id="displayInput"
            v-model="displayInput"
            type="text"
            class="form-control shadow-sm fw-bold"
            placeholder="닉네임 입력"
          >
        </div>
        <div
          class="mx-3"
          style="margin-top: 1.5rem;"
        >
          <label
            for="passwordInput"
            class="form-label fw-bold"
          >비밀번호</label>
          <input
            id="passwordInput"
            v-model="passwordInput"
            type="password"
            class="form-control shadow-sm fw-bold"
            placeholder="비밀번호 입력"
          >
        </div>
        <div
          class="mx-3"
          style="margin-top: 0.5em;"
        >
          <label
            for="passwordCheckInput"
            class="form-label fw-bold"
          >비밀번호 확인</label>
          <input
            id="passwordCheckInput"
            v-model="passwordCheckInput"
            type="password"
            class="form-control shadow-sm fw-bold"
            placeholder="비밀번호 확인 입력"
          >
        </div>
        <div
          class="d-grid gap-2 mx-3"
          style="margin-top: 2.5rem;"
        >
          <button
            class="btn btn-primary mb-2 shadow-sm fw-bold"
            type="button"
            @click="register"
          >
            회원가입
          </button>
          <router-link
            class="btn btn-outline-primary shadow-sm fw-bold"
            type="button"
            to="/login"
          >
            로그인
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import Nav from '../components/Nav'

const auth = getAuth()
const db = getFirestore()

export default {
  name: 'Register',
  components: {
    Nav
  },
  data () {
    return {
      emailInput: '',
      displayInput: '',
      passwordInput: '',
      passwordCheckInput: ''
    }
  },
  methods: {
    register () {
      if (this.passwordInput !== this.passwordCheckInput) {
        this.$toast.error('비밀번호가 일치하지 않습니다!', {
          position: 'top-center',
          timeout: 2000
        })
      } else {
        createUserWithEmailAndPassword(auth, this.emailInput, this.passwordInput)
          .then(() => {
            setDoc(doc(db, `users/${auth.currentUser.uid}`), {
              postId: [],
              description: ''
            })
            updateProfile(auth.currentUser, {
              displayName: this.displayInput
            })
            this.$router.push('/')
          })
          .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.log(errorCode, errorMessage)
          })
      }
    }
  }
}
</script>

<style scoped>

</style>
