<template>
  <div>
    <Nav :setting="false" />
    <div class="input-group mb-3">
      <span
        id="basic-addon1"
        class="input-group-text"
      >@</span>
      <input
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
  </div>
</template>

<script>
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import Nav from '../components/Nav.vue'

export default {
  components: {
    Nav
  },
  methods: {
    onFileChange (e) {
      const file = e.target.files[0]
      const storage = getStorage()
      const imageRef = ref(storage, 'profile/' + file.name)
      uploadBytesResumable(imageRef, file)
        .then((snapshot) => {
          console.log('Uploaded', snapshot.totalBytes, 'bytes.')
          console.log('File metadata:', snapshot.metadata)
          // Let's get a download URL for the file.
          getDownloadURL(snapshot.ref).then((url) => {
            console.log('File available at', url)
            // ...
          })
        }).catch((error) => {
          console.error('Upload failed', error)
          // ...
        })
    }
  }
}
</script>

<style>

</style>
