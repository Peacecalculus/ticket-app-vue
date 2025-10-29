<template>
  <header v-if="isAuth" class="app-header">
    <div class="logo">TicketApp</div>
    <nav class="main-nav">
      <router-link to="/dashboard">Dashboard</router-link>
      <router-link to="/tickets">Manage Tickets</router-link>
      <button @click="handleLogout" class="btn btn-logout">
        <i class="fa-solid fa-right-from-bracket"></i> Logout
      </button>
    </nav>
  </header>
  <header v-else class="header_wrapper">
    <div class="logo_section">
      <div class="logo">TicketApp</div>
      <nav class="nav-links">
        <router-link to="/auth" class="nav-btn--push-right">Login</router-link>
        <router-link to="/auth" class="nav_btn">Get Started</router-link>
      </nav>
    </div>
  </header>
</template>

<script>
import { logout } from '../utils/helpers'

export default {
  name: 'AppHeader',
  props: {
    isAuth: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleLogout() {
      logout()
      this.$router.push('/')
    }
  }
}
</script>
