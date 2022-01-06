import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.js'
import vueMoment from 'vue-moment'
import moment from 'moment'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'
import Prism from 'prismjs'
import koKR from '@kangc/v-md-editor/lib/lang/ko-KR'
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID
}

const app = initializeApp(firebaseConfig)
const db = getFirestore() // eslint-disable-line no-unused-vars
const analytics = getAnalytics(app) // eslint-disable-line no-unused-vars

Vue.config.productionTip = false

VueMarkdownEditor.use(githubTheme, {
  Prism
})
VueMarkdownEditor.lang.use('ko-KR', koKR)
VMdPreview.use(githubTheme, {
  Prism
})

moment.locale('ko')

Vue.use(vueMoment, { moment })
Vue.use(Toast)
Vue.use(VueMarkdownEditor)
Vue.use(VMdPreview)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
