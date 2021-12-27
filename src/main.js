import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getAnalytics } from 'firebase/analytics'
import { rtdbPlugin } from 'vuefire'
import 'bootstrap/dist/css/bootstrap.css'

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
const database = getDatabase(app) // eslint-disable-line no-unused-vars
const analytics = getAnalytics(app) // eslint-disable-line no-unused-vars

Vue.use(rtdbPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
