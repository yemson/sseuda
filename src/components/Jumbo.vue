<template>
  <div class="container">
    <div class="row align-items-md-stretch mt-4">
      <div class="col-md-6">
        <div class="h-100 p-5 bg-light border rounded-3">
          <h2>Add borders</h2>
          <p>Or, keep it light and add a border for some added definition to the boundaries of your content. Be sure to look under the hood at the source HTML here as we've adjusted the alignment and sizing of both column's content for equal-height.</p>
          <button
            class="btn btn-outline-secondary"
            type="button"
          >
            Example button
          </button>
        </div>
      </div>
      <div class="col-md-6">
        <div class="h-100 p-5 bg-light border rounded-3">
          <h2>Add borders</h2>
          <p>Or, keep it light and add a border for some added definition to the boundaries of your content. Be sure to look under the hood at the source HTML here as we've adjusted the alignment and sizing of both column's content for equal-height.</p>
          <button
            class="btn btn-outline-secondary"
            type="button"
          >
            Example button
          </button>
        </div>
      </div>
    </div>
    <div class="row row-cols-1 row-cols-md-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-3 g-4 mt-1">
      <div class="col">
        <div class="card h-100">
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
        <div class="card h-100">
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
        <div class="card h-100">
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
        <div class="card h-100">
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
  .card {
    border: none;
    border-radius: 0;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05);
  }
  .jumbo-title {
      font-size: 2rem;
      font-weight: bold;
  }
</style>
