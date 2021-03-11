<template>
    <div class="flex items-center justify-center h-screen w-screen container mx-auto ">
        <h1 class="text-5xl text-gray-500 font-sans">Hello my name is {{$store.state.data.profile.username}}</h1>          
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
