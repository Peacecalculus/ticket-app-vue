<template>
  <div class="app-container">
    <Header />
    
    <Toast v-if="toast" :message="toast.message" :type="toast.type" @close="toast = null" />
    
    <div class="auth-wrapper">
      <section class="auth-section">
        <h2>{{ isLogin ? 'Welcome Back' : 'Create Account' }}</h2>
        <p>{{ isLogin ? 'Login to your account' : 'Sign up to get started' }}</p>
        
        <form class="auth-form" @submit.prevent="handleSubmit">
          <div v-if="!isLogin" class="form-group">
            <label for="name">Full Name</label>
            <input type="text" id="name" v-model="formData.name" placeholder="Enter your full name" />
            <div v-if="errors.name" class="error-message">{{ errors.name }}</div>
          </div>
          
          <div class="form-group">
            <label for="email">Email Address</label>
            <input type="email" id="email" v-model="formData.email" placeholder="Enter your email" />
            <div v-if="errors.email" class="error-message">{{ errors.email }}</div>
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="formData.password" placeholder="Enter your password" />
            <div v-if="errors.password" class="error-message">{{ errors.password }}</div>
          </div>
          
          <button type="submit" class="btn btn-primary" style="width: 100%">
            {{ isLogin ? 'Login' : 'Sign Up' }}
          </button>
        </form>
        
        <div class="auth-switch">
          {{ isLogin ? "Don't have an account? " : "Already have an account? " }}
          <a href="#" @click.prevent="toggleForm">{{ isLogin ? 'Sign Up' : 'Login' }}</a>
        </div>
      </section>
    </div>
    
    <Footer />
  </div>
</template>

<script>
import { login, signup, validateAuth } from '../utils/helpers'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Toast from '../components/Toast.vue'

export default {
  name: 'Auth',
  components: { Header, Footer, Toast },
  data() {
    return {
      isLogin: true,
      formData: { name: '', email: '', password: '' },
      errors: {},
      toast: null
    }
  },
  methods: {
    handleSubmit() {
      const validation = validateAuth(this.formData, !this.isLogin)
      if (!validation.isValid) {
        this.errors = validation.errors
        return
      }
      
      let result
      if (this.isLogin) {
        result = login(this.formData.email, this.formData.password)
      } else {
        result = signup(this.formData.name, this.formData.email, this.formData.password)
      }
      
      if (result.success) {
        this.toast = { message: `${this.isLogin ? 'Login' : 'Signup'} successful!`, type: 'success' }
        setTimeout(() => {
          this.$router.push('/dashboard')
        }, 1000)
      } else {
        this.toast = { message: result.error, type: 'error' }
      }
    },
    toggleForm() {
      this.isLogin = !this.isLogin
      this.formData = { name: '', email: '', password: '' }
      this.errors = {}
    }
  },
  watch: {
    formData: {
      handler() {
        this.errors = {}
      },
      deep: true
    }
  }
}
</script>
