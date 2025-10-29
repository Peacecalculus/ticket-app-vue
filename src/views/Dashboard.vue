<template>
  <div class="app-container">
    <Header :isAuth="true" />
    
    <main class="dashboard-content">
      <h1>Welcome to Your Dashboard{{ user ? `, ${user.name}` : '' }}</h1>
      
      <section class="stat-cards-grid">
        <div class="stat-card">
          <div class="stat-icon"><i class="fa-solid fa-list-check"></i></div>
          <div class="stat-value">{{ stats.total }}</div>
          <div class="stat-label">Total Tickets</div>
        </div>
        
        <div class="stat-card status-open">
          <div class="stat-icon"><i class="fa-solid fa-unlock"></i></div>
          <div class="stat-value">{{ stats.open }}</div>
          <div class="stat-label">Open Tickets</div>
        </div>
        
        <div class="stat-card status-progress">
          <div class="stat-icon"><i class="fa-solid fa-spinner"></i></div>
          <div class="stat-value">{{ stats.in_progress }}</div>
          <div class="stat-label">In Progress</div>
        </div>
        
        <div class="stat-card status-closed">
          <div class="stat-icon"><i class="fa-solid fa-check-double"></i></div>
          <div class="stat-value">{{ stats.closed }}</div>
          <div class="stat-label">Resolved Tickets</div>
        </div>
      </section>
      
      <section class="action-section">
        <h2>Quick Actions</h2>
        <div class="action-box card-box">
          <p>Ready to jump into the details? View, create, and manage all support requests.</p>
          <router-link to="/tickets" class="btn btn-manage">
            <i class="fa-solid fa-gear"></i> Go to Ticket Management
          </router-link>
        </div>
        <div class="decorative-circle top-right"></div>
      </section>
    </main>
    
    <Footer />
  </div>
</template>

<script>
import { getTicketStats, getSession } from '../utils/helpers'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'Dashboard',
  components: { Header, Footer },
  data() {
    return {
      stats: { total: 0, open: 0, in_progress: 0, closed: 0 },
      user: null
    }
  },
  mounted() {
    this.user = getSession()
    this.stats = getTicketStats()
  }
}
</script>
