<template>
  <div>
    <Nav :hide="true" />
    <div
      class="card"
      style="width: 30rem; height: 28rem; margin: 4em auto 0;"
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
            type="email"
            class="form-control shadow-sm fw-bold"
            placeholder="이메일 입력"
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
            type="password"
            class="form-control shadow-sm"
            placeholder="비밀번호 입력"
          >
        </div>
        <div
          class="d-grid gap-2 mx-3"
          style="margin-top: 2.5rem;"
        >
          <button
            class="btn btn-primary mb-2 shadow-sm fw-bold"
            type="button"
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
import Nav from '../components/Nav'

export default {
  name: 'Register',
  components: {
    Nav
  }
}
</script>

<style scoped>

</style>
