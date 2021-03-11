<template>
  <div class="flex flex-col justify-center items-center h-screen w-screen">
    <h1>{{ msg }}</h1>
    <button class="" @click="$router.go(-1)" >Go back</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'About page yeee!'
    }
  },
  methods: {
    goBack() {
        this.$router.go(-1);
    }
  },
}
</script>
