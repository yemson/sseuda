<template>
  <div>
    <Nav />
    <div class="container">
      <h1
        class="mt-4 fw-bold"
        style="display: inline-flex"
      >
        {{ post.title }}
      </h1>
      <v-md-preview
        :text="postContent"
      />
      <hr class="solid">
      <div class="container">
        <small
          class="text-muted"
          style="float: right; margin-left: 0.3em;"
        >{{ likeCount }}</small>
        <div v-if="canLike">
          <div v-if="!clicked">
            <i
              class="bi bi-heart text-muted"
              style="float: right; font-size: 1.5em;"
              @click="likePost"
            />
          </div>
          <div v-else>
            <i
              class="bi bi-heart-fill text-muted"
              style="float: right; font-size: 1.5em;"
              @click="likePost"
            />
          </div>
        </div>
        <div v-else>
          <i
            class="bi bi-heart text-muted"
            style="float: right; font-size: 1.5em;"
            @click="$toast.error('로그인 후 이용 가능합니다!', {
              position: 'top-center',
              timeout: 2000
            })"
          />
        </div>
        <div>
          <p class="text-muted fw-bold">
            작성자: {{ post.userEmail }}
          </p>
          <p class="text-muted fw-bold">
            작성일: {{ post.createdAt | moment("YYYY년 MMMM Do, dddd") }}
          </p>
        </div>
      </div>
      <hr class="solid">
      <h1>댓글</h1>
      <div
        v-for="comment in comments"
        :key="comment.id"
        class="container"
      >
        <div class="card mt-3 shadow-sm">
          <h5 class="card-header text-muted">
            {{ comment.userEmail }}
          </h5>
          <div class="card-body">
            <p class="card-text">
              {{ comment.content }}
            </p>
          </div>
          <div class="card-footer">
            <small class="text-muted fw-bold">
              {{ comment.createdAt | moment("YYYY년 MMMM Do, dddd") }}
            </small>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="input-group mt-4 shadow-sm">
          <span class="input-group-text">댓글 입력</span>
          <textarea
            v-model="inputComment"
            class="form-control"
            aria-label="댓글 입력"
          />
        </div>
        <div v-if="canComment">
          <button
            class="btn btn-primary my-2 mb-5 shadow-sm"
            style="float: right;"
            @click="createComment"
          >
            댓글 작성
          </button>
        </div>
        <div v-else>
          <button
            class="btn btn-primary my-2 mb-5 shadow-sm"
            style="float: right"
            @click="$toast.error('로그인 후 이용 가능합니다!', {
              position: 'top-center',
              timeout: 2000
            })"
          >
            댓글 작성
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { doc, getDoc, collection, addDoc, getFirestore, query, onSnapshot, orderBy, updateDoc } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Turndown from 'turndown'
import Nav from '../components/Nav.vue'

export default {
  name: 'PostDetail',
  components: {
    Nav
  },
  data () {
    return {
      post: {},
      postContent: '',
      inputComment: '',
      canComment: false,
      canLike: false,
      comments: [],
      clicked: false,
      likeCount: 0
    }
  },
  mounted () {
    this.postDetail()
    this.checkAuth()
    this.getComments()
  },
  updated () {
    this.checkLike()
  },
  methods: {
    async postDetail () {
      const db = getFirestore()
      const post = await getDoc(doc(db, `posts/${this.$route.params.id}`))
      const turndownService = new Turndown()
      const html = turndownService.turndown(post.data().content)
      // console.log(html)
      this.post = post.data()
      this.postContent = html
    },
    checkAuth () {
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
        if (user == null) {
          this.canComment = false
          this.canLike = false
        } else {
          this.canComment = true
          this.canLike = true
        }
      })
    },
    async createComment () {
      const db = getFirestore()
      if (this.inputComment === '') {
        this.$toast.error('내용을 입력해주세요!', {
          position: 'top-center',
          timeout: 2000
        })
      } else {
        try {
          const docRef = await addDoc(collection(db, `posts/${this.$route.params.id}/comments`), {
            content: this.inputComment,
            createdAt: Date.now(),
            userUid: getAuth().currentUser.uid,
            userEmail: getAuth().currentUser.email
          })
          console.log('Document written with ID: ', docRef.id)
          this.$toast.success('댓글 작성 완료!', {
            position: 'top-center',
            timeout: 2000
          })
          this.inputComment = ''
        } catch (e) {
          console.error('Error adding document: ', e)
        }
      }
    },
    async getComments () {
      const db = getFirestore()
      const q = query(collection(db, `posts/${this.$route.params.id}/comments`), orderBy('createdAt', 'desc'))
      onSnapshot(q, (snapshot) => {
        this.comments = []
        snapshot.forEach((doc) => {
          this.comments.push({
            id: doc.id,
            ...doc.data()
          })
        })
      })
    },
    async likePost () {
      const db = getFirestore()
      const post = await getDoc(doc(db, `posts/${this.$route.params.id}`))
      const likes = post.data().likes
      this.clicked = !this.clicked
      if (this.clicked) {
        likes.push(getAuth().currentUser.uid)
        this.likeCount = likes.length
      } else {
        likes.splice(likes.indexOf(getAuth().currentUser.uid), 1)
        this.likeCount = likes.length
      }
      await updateDoc(doc(db, `posts/${this.$route.params.id}`), {
        likes
      })
    },
    async checkLike () {
      const db = getFirestore()
      const auth = getAuth()
      const post = await getDoc(doc(db, `posts/${this.$route.params.id}`))
      const likes = post.data().likes
      this.likeCount = likes.length
      onAuthStateChanged(auth, (user) => {
        if (user == null) {
          this.clicked = false
        } else {
          if (likes.includes(user.uid)) {
            this.clicked = true
          } else {
            this.clicked = false
          }
        }
      })
    }
  }
}
</script>

<style>
  hr.solid {
    border-top: 2px solid #999;
  }
</style>
