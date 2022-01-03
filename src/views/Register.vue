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
    <div
      class="card rounded-0"
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
          회원가입
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
            class="form-control rounded-0 shadow-sm"
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
            class="form-control rounded-0 shadow-sm"
            placeholder="비밀번호 입력"
          >
        </div>
        <div
          class="d-grid gap-2 mx-3"
          style="margin-top: 2.5rem;"
        >
          <button
            class="btn btn-primary mb-2 rounded-0 shadow-sm"
            type="button"
          >
            회원가입
          </button>
          <router-link
            class="btn btn-outline-primary rounded-0 shadow-sm"
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

<style scoped>

</style>
