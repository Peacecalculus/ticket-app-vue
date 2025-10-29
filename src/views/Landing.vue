<template>
  <div class="app-container">
    <Header />
    
    <div class="top-wave-container">
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z" fill="#fff" opacity="0.3">
          <animate attributeName="d" dur="8s" repeatCount="indefinite"
            values="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z;
                    M0,50 C150,0 350,100 600,0 C850,0 1050,100 1200,50 L1200,120 L0,120 Z;
                    M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z"/>
        </path>
      </svg>
    </div>
    
    <section class="hero_section">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
      
      <div class="hero-content">
        <h1>Manage Your Support Tickets with Ease</h1>
        <p>Track, organize, and resolve customer support requests efficiently. A powerful ticket management system built for modern teams.</p>
        <div class="hero-cta">
          <router-link to="/auth" class="cta_btn">Get Started Now</router-link>
        </div>
      </div>
    </section>
    
    <div class="bottom-wave-container">
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,50 C150,0 350,100 600,0 C850,0 1050,100 1200,50 L1200,0 L0,0 Z" fill="#fff">
          <animate attributeName="d" dur="8s" repeatCount="indefinite"
            values="M0,50 C150,0 350,100 600,0 C850,0 1050,100 1200,50 L1200,0 L0,0 Z;
                    M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,0 L0,0 Z;
                    M0,50 C150,0 350,100 600,0 C850,0 1050,100 1200,50 L1200,0 L0,0 Z"/>
        </path>
      </svg>
    </div>
    
    <section class="feature_section">
      <h2>Why Choose Our Ticket System?</h2>
      <div class="feature-cards">
        <div class="card">
          <h3><i class="fa-solid fa-bolt"></i> Fast & Efficient</h3>
          <p>Create and manage tickets in seconds. Our intuitive interface makes ticket management effortless.</p>
        </div>
        <div class="card">
          <h3><i class="fa-solid fa-shield-halved"></i> Secure & Reliable</h3>
          <p>Your data is protected with industry-standard security. Authentication ensures only authorized access.</p>
        </div>
        <div class="card">
          <h3><i class="fa-solid fa-chart-line"></i> Track Progress</h3>
          <p>Monitor ticket status from open to closed. Get real-time insights into your support workflow.</p>
        </div>
      </div>
    </section>
    
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'Landing',
  components: { Header, Footer }
}
</script>
