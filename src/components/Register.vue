<template>
<div class="flex flex-wrap w-full">
    <div class="flex flex-col w-full md:w-1/2">
        <div class="flex justify-center pt-12 md:justify-start md:pl-12 md:-mb-24">
            <router-link to="/" class="p-4 text-xl font-bold text-black bg-white">
                <img class="w-60 " src="../assets/scalepathlogo.png" />
                <p class="float-right  text-gray-500 ">Technical interview</p>
            </router-link>
        </div>
        <div class="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
            <p class="text-3xl text-center">
                Welcome.
            </p>
            <form novalidate @submit.prevent="handleRegister" class="flex flex-col pt-3 md:pt-8">
                <div class="flex flex-col pt-4">
                    <div class="flex relative ">
                        <span  class=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                              <i class="fas fa-user"></i>
                        </span>
                        <input :class="errors.has('username')?'border-red-500':''" v-model="user.username" v-validate="'required'" name="username" id="username" class=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="User name" />
                    </div>
                    <div v-if="errors.has('username')" class="text-red-500 text-xs  p-1 pt-0" role="alert">Username is required!</div>
                </div>
                 <div class="flex flex-col pt-4">
                    <div class="flex relative ">
                        <span class=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                            <i class="fas fa-envelope"></i>
                        </span>
                        <input :class="errors.has('email')?'border-red-500':''" v-model="user.email" v-validate="'required|email'" name="email" id="email" class=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Email" />
                    </div>
                    <div v-if="errors.has('email')" class="text-red-500 text-xs  p-1 pt-0" role="alert">email is required!</div>
                </div>
                <div class="flex flex-col pt-4 mb-12">
                    <div class="flex relative ">
                        <span class=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                             <i class="fas fa-lock"></i>
                        </span>
                        <input :class="errors.has('password')?'border-red-500':''" v-model="user.password" v-validate="'required'" type="password" name="password" id="password" class=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Password" />
                    </div>
                    <div v-if="errors.has('password')" class="text-red-500  text-xs  p-1 pt-0" role="alert">Password is required!</div>
                </div>
                <p class="text-base text-center p-14 text-red-400" id="result">
                    {{message}}
                </p>
                <button type="submit" class="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-black shadow-md hover:text-black hover:bg-white focus:outline-none focus:ring-2">
                    <span class="w-full">
                        Register
                    </span>
                </button>
            </form>
            <div class="pt-12 pb-12 text-center">
                <p>
                    Have an account?
                    <router-link to="login" class="font-semibold underline">
                        Login.
                    </router-link>
                </p>
            </div>
        </div>
    </div>
    <div class="w-1/2 shadow-2xl">
        <img class="hidden object-cover w-full h-screen md:block" src="../assets/9.jpg" />
    </div>
</div>
</template>

<script>
import User from '../models/user';

export default {
    name: 'Login',
    data() {
        return {
            user: new User('', ''),
            loading: false,
            message: '',
        };
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        }
    },
    created() {
        if (this.loggedIn) {
            this.$router.push('/profile');
        }
    },
    methods: {
        handleRegister() {
            this.loading = true;
            this.$validator.validateAll().then(isValid => {
                if (!isValid) {
                    this.loading = false;
                    this.$toasted.show('Please enter valid inputs',{type:'error'})
                    return;
                }

                if (this.user.username && this.user.password) {
                    this.$store.dispatch('auth/register', this.user).then(
                        () => {
                            this.$router.push('/login');

                        },
                        error => {
                            this.loading = false;
                            this.message = error.response.data.username[0]
                        }
                    );
                }
            });
        }
    }
};
</script>
