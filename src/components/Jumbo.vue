<template>
  <div class="container">
    <div class="row align-items-md-stretch mt-2">
      <div class="col-md-6 mt-2">
        <div class="h-100 p-5 bg-light border rounded-3 shadow-sm">
          <h2 class="fw-bold mt-2">
            오늘의 제시어
          </h2>
          <p class="fs-1">
            자몽, 귤, 오렌지
          </p>
          <router-link
            class="btn btn-outline-secondary mt-2"
            type="button"
            to="/post"
          >
            글쓰러 가기
          </router-link>
        </div>
      </div>
      <div class="col-md-6 mt-2">
        <div class="h-100 p-5 bg-light border rounded-3 shadow-sm">
          <img
            :src="require('../assets/image/profile.png')"
            alt="jumbo"
            class="img-fluid"
            style="width: 85px"
          >
          <h3>{{ user.email }}</h3>
          <button
            class="btn btn-outline-secondary"
            type="button"
          >
            마이페이지
          </button>
        </div>
      </div>
    </div>
    <hr class="solid shadow-sm">
    <div class="row row-cols-1 row-cols-md-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-3 g-4">
      <div class="col">
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title">
              Card title
            </h5>
            <p class="card-text">
              This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
            </p>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title">
              Card title
            </h5>
            <p class="card-text">
              This is a short card.
            </p>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title">
              Card title
            </h5>
            <p class="card-text">
              This is a longer card with supporting text below as a natural lead-in to additional content.
            </p>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title">
              Card title
            </h5>
            <p class="card-text">
              This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default {
  name: 'Jumbo',
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
}
</script>

<style>
  .jumbo-title {
      font-size: 2rem;
      font-weight: bold;
  }
  hr.solid {
    border-top: 2px solid #999;
  }
</style>
