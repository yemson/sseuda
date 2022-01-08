<template>
  <div>
    <Nav />
    <div class="container">
      <div class="row align-items-md-stretch mt-2">
        <div class="col-md-6 mt-2">
          <div class="h-100 p-5 bg-light border shadow-sm rounded-3">
            <h4 class="fw-bold mt-2">
              {{ $moment().format('YYYY-MM-DD') }}
            </h4>
            <h1 class="fw-bold mt-2">
              오늘의 제시어
            </h1>
            <p class="fs-1">
              -
            </p>
            <div v-if="user !== ''">
              <router-link
                class="btn btn-outline-secondary mt-2 fw-bold"
                type="button"
                to="/post"
              >
                글쓰러 가기
              </router-link>
            </div>
            <div v-else>
              <button
                class="btn btn-outline-secondary mt-2 fw-bold"
                type="button"
                @click="$toast.error('로그인 후 이용 가능합니다!', {
                  position: 'top-center',
                  timeout: 2000
                })"
              >
                글쓰러 가기
              </button>
            </div>
          </div>
        </div>
        <div class="col-md-6 mt-2">
          <div
            class="h-100 p-5 bg-light border shadow-sm rounded-3"
          >
            <div
              v-if="user !== ''"
            >
              <img
                :src="user.photoURL"
                alt="jumbo"
                class="img-fluid img-thumbnail rounded-circle"
                style="width: 150px; height: 150px; object-fit: cover;"
              >
            </div>
            <div v-else>
              <h2
                class="text-center fw-bold d-flex align-items-center justify-content-center"
                style="margin-top: 2em; margin-bottom: 1em;"
              >
                먼저 로그인을 해주세요!
              </h2>
              <router-link
                :to="'/login'"
                class="text-center d-block"
              >
                로그인하러 가기
              </router-link>
            </div>
            <h3>{{ user.displayName }}</h3>
          </div>
        </div>
      </div>
      <hr class="solid shadow-sm">
      <ul
        id="pills-tab"
        class="nav nav-pills mb-3"
        role="tablist"
      >
        <li
          class="nav-item"
          role="presentation"
        >
          <button
            id="pills-today-tab"
            class="nav-link active"
            data-bs-toggle="pill"
            data-bs-target="#pills-today"
            type="button"
            role="tab"
            aria-controls="pills-today"
            aria-selected="true"
          >
            오늘
          </button>
        </li>
        <li
          class="nav-item"
          role="presentation"
        >
          <button
            id="pills-total-tab"
            class="nav-link"
            data-bs-toggle="pill"
            data-bs-target="#pills-total"
            type="button"
            role="tab"
            aria-controls="pills-total"
            aria-selected="false"
          >
            전체
          </button>
        </li>
        <li
          class="nav-item"
          role="presentation"
        >
          <button
            id="pills-hot-tab"
            class="nav-link"
            data-bs-toggle="pill"
            data-bs-target="#pills-hot"
            type="button"
            role="tab"
            aria-controls="pills-hot"
            aria-selected="false"
          >
            인기
          </button>
        </li>
      </ul>
      <div
        id="pills-tabContent"
        class="tab-content"
      >
        <div
          id="pills-today"
          class="tab-pane fade show active"
          role="tabpanel"
          aria-labelledby="pills-today-tab"
        >
          <hr class="solid shadow-sm">
          <div class="row row-cols-1 row-cols-md-2 row-cols-md-2 row-cols-lg-2 row-cols-xl-3 g-4 mb-4">
            <div
              v-for="post in posts"
              :key="post.id"
            >
              <div v-if="$moment(post.createdAt).format('YYYY-MMMM-DD') === $moment().format('YYYY-MMMM-DD')">
                <div class="col">
                  <router-link
                    :to="`/postdetail/${post.id}`"
                    style="text-decoration: none; color: inherit"
                  >
                    <div
                      class="card shadow-sm"
                      style="min-height: 25em; max-height: 25em;"
                    >
                      <div
                        class="card-body"
                        style="overflow: hidden;"
                      >
                        <h4 class="card-title fw-bold">
                          {{ post.title }}
                        </h4>
                        <p
                          class="card-text lh-lg fw-bolder text-muted"
                        >
                          {{ validatePostContent(post.content) }}
                        </p>
                      </div>
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                          <small class="text-muted fw-bold">{{ post.createdAt | moment("YYYY년 MMMM Do, dddd") }}</small>
                          {{ $moment(post.createdAt).format("YYYY-MMMM-DD") }}
                        </li>
                      </ul>
                      <div class="card-footer text-muted fw-bold">
                        {{ post.displayName }}
                      </div>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="pills-total"
          class="tab-pane fade"
          role="tabpanel"
          aria-labelledby="pills-total-tab"
        >
          <hr class="solid shadow-sm">
          <div class="row row-cols-1 row-cols-md-2 row-cols-md-2 row-cols-lg-2 row-cols-xl-3 g-4 mb-4">
            <div
              v-for="post in posts"
              :key="post.id"
            >
              <div class="col">
                <router-link
                  :to="`/postdetail/${post.id}`"
                  style="text-decoration: none; color: inherit"
                >
                  <div
                    class="card shadow-sm"
                    style="min-height: 25em; max-height: 25em;"
                  >
                    <div
                      class="card-body"
                      style="overflow: hidden;"
                    >
                      <h4 class="card-title fw-bold">
                        {{ post.title }}
                      </h4>
                      <p
                        class="card-text lh-lg fw-bolder text-muted"
                      >
                        {{ validatePostContent(post.content) }}
                      </p>
                    </div>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">
                        <small class="text-muted fw-bold">{{ post.createdAt | moment("YYYY년 MMMM Do, dddd") }}</small>
                        {{ $moment(post.createdAt).format("YYYY-MMMM-DD") }}
                      </li>
                    </ul>
                    <div class="card-footer text-muted fw-bold">
                      {{ post.displayName }}
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div
          id="pills-hot"
          class="tab-pane fade"
          role="tabpanel"
          aria-labelledby="pills-hot-tab"
        >
          ...
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import Nav from '../components/Nav.vue'

export default {
  name: 'Home',
  components: {
    Nav
  },
  data () {
    return {
      user: '',
      posts: []
    }
  },
  mounted () {
    this.checkAuth()
    this.getPosts()
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
    async getPosts () {
      const db = getFirestore()
      const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'))
      onSnapshot(q, (snapshot) => {
        this.posts = []
        snapshot.forEach((doc) => {
          this.posts.push({
            id: doc.id,
            ...doc.data()
          })
        })
      })
    },
    validatePostContent (content) {
      return content.replace(/(<([^>]+)>)/ig, '')
    }
  }
}
</script>

<style scoped>
  hr.solid {
    border-top: 2px solid #999;
  }
  .card{
    border-radius: 4px;
    background: #fff;
    box-shadow: 0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05);
    transition: .3s transform cubic-bezier(.155,1.105,.295,1.12),.3s box-shadow,.3s -webkit-transform cubic-bezier(.155,1.105,.295,1.12);
    cursor: pointer;
  }
  .card:hover{
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06);
}
</style>
