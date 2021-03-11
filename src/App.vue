<template>
  <div id="app" >
 <transition name="fade">
    <router-view/>
 </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style >

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}


.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.slide-fade-enter-active {
  transition: all .2s ease;
}
.slide-fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
 {
  transform: translateX(10px);
  opacity: 0;
}
</style>
