<template>
  <div>
    <Nav :setting="false" />
    <div class="input-group mb-3">
      <span
        id="basic-addon1"
        class="input-group-text"
      >@</span>
      <input
        v-model="displayNameInput"
        type="text"
        class="form-control"
        placeholder="displayName"
        aria-label="displayName"
        aria-describedby="basic-addon1"
      >
    </div>
    <div class="mb-3">
      <label
        for="formFile"
        class="form-label"
      >Default file input example</label>
      <input
        id="formFile"
        class="form-control"
        type="file"
        @change="onFileChange"
      >
    </div>
    <div
      class="btn btn-primary"
      @click="changeProfile"
    >
      Submit
    </div>
  </div>
</template>

<script>
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { getAuth, updateProfile } from 'firebase/auth'
import Nav from '../components/Nav.vue'

const auth = getAuth()
const storage = getStorage()

export default {
  components: {
    Nav
  },
  data () {
    return {
      displayNameInput: '',
      file: null
    }
  },
  methods: {
    onFileChange (e) {
      const file = e.target.files[0]
      const imageRef = ref(storage, 'profile/' + file.name)
      uploadBytesResumable(imageRef, file)
        .then((snapshot) => {
          console.log('Uploaded', snapshot.totalBytes, 'bytes.')
          getDownloadURL(snapshot.ref).then((url) => {
            console.log('File available at', url)
            updateProfile(auth.currentUser, {
              photoURL: url
            })
          })
        }).catch((error) => {
          console.error('Upload failed', error)
        })
    },
    changeProfile () {
      updateProfile(auth.currentUser, {
        displayName: this.displayNameInput
      }).then(() => {
        console.log('Profile updated')
      }).catch((error) => {
        console.error('Profile update failed', error)
      })
    }
  }
}
</script>

<style>

</style>
