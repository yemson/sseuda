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
            class="btn btn-primary"
            type="button"
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
