<template>
  <div class="flex flex-col justify-center items-center h-screen w-screen">
    
<div class="bg-white dark:bg-gray-800 flex relative z-20 items-center">
    <div class="container mx-auto px-6 flex flex-col justify-between items-center relative py-8">
        <div class="items-center flex flex-col">
            <h1 class="font-light w-full uppercase text-center text-4xl sm:text-5xl dark:text-white text-gray-800">
                Scaleable Path Technical interview
            </h1>
            <h2 class="font-light max-w-2xl mx-auto w-full text-2xl dark:text-white text-gray-500 text-center py-8">
               This is a boilerplate intended to make the interview as swift as possible 
            </h2>
            <p class="mt-2 max-w-xl text-lg font-mono text-blue-600" >Fronend with : Vue, Tailwindcss</p>
            <p class="mt-2 max-w-xl text-lg font-mono text-blue-600">Backend with : Django unchained :)</p>
            <div class="flex items-center justify-center mt-4">
                <router-link to="login" class="uppercase py-2 px-4 bg-gray-800 border-2 border-transparent text-white text-md mr-4 hover:bg-gray-900">
                    <template>
                      <div v-if="$store.state.auth.user">
                        Profile
                      </div>
                      <div v-else>
                        Login
                      </div>
                    </template>
                </router-link>
                <router-link to="register" class="uppercase py-2 px-4 bg-transparent border-2 border-gray-800 text-gray-800 dark:text-white hover:bg-gray-800 hover:text-white text-md">
                    Register
                </router-link>
            </div>
        </div>
        <div class="p-10 block w-full mx-auto mt-6 md:mt-0 relative">
            <img src="../assets/scalebg.png" class="max-w-xs md:max-w-2xl m-auto"/>
        </div>
        <div class="cursor-pointer py-2 px-4 bg-transparent border-2 border-red-800 text-red-800 dark:text-white hover:bg-red-800 hover:text-white text-md" @click="logout" v-if="$store.state.auth.user">
                        Logout
          </div>
    </div>
</div>

  </div>
</template>

<script>
export default {
  data () {
    return {
    
    }
  },
  methods: {
       logout() {
            this.$store.dispatch('auth/logout');
            this.$router.replace('/');
        }
  },
}
</script>
