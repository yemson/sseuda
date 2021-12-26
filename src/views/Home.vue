<template>
  <div>
    <Nav />
    <Jumbo />
  </div>
</template>

<script>
import Nav from '../components/Nav.vue'
import Jumbo from '../components/Jumbo.vue'

export default {
  name: 'Home',
  components: {
    Nav,
    Jumbo
  }
}
</script>
