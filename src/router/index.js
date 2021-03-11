import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import About from '@/components/About'
import Profile from '@/components/Profile'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Products from '@/components/Products'
import Me from '@/components/Me'

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      children:[
        {
          path: '',
          name: 'Me',
          component: Me
        },
        {
          path: 'products',
          name: 'Products',
          component: Products
        },
      ]
    }
  ]
})
