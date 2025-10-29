<template>
  <div class="app-container">
    <Header :isAuth="true" />
    
    <Toast v-if="toast" :message="toast.message" :type="toast.type" @close="toast = null" />
    
    <div v-if="deleteModal" class="modal" @click.self="deleteModal = null">
      <div class="modal-content">
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete "{{ deleteModal.title }}"?</p>
        <div class="modal-actions">
          <button @click="deleteModal = null" class="btn btn-secondary">Cancel</button>
          <button @click="confirmDelete" class="btn btn-danger">Delete</button>
        </div>
      </div>
    </div>
    
    <main class="tickets-content">
      <h1>Ticket Management</h1>
      
      <!-- LIST VIEW -->
      <div v-if="view === 'list'" class="view-section active">
        <div class="list-header">
          <h2>All Tickets</h2>
          <button @click="handleCreateNew" class="btn btn-primary">
            <i class="fa-solid fa-plus"></i> Create New Ticket
          </button>
        </div>
        
        <div v-if="tickets.length === 0" class="empty-state">
          <p>No tickets found. Create your first ticket to get started!</p>
        </div>
        
        <div v-else class="tickets-grid">
          <div v-for="ticket in tickets" :key="ticket.id" :class="['ticket-card', `status-${ticket.status}`]">
            <span class="ticket-status-tag">{{ getStatusLabel(ticket.status) }}</span>
            <h3 class="ticket-title">{{ ticket.title }}</h3>
            <p class="ticket-description">{{ ticket.description || 'No description provided' }}</p>
            <div class="ticket-meta">
              <div>Priority: {{ ticket.priority || 'medium' }}</div>
              <div>Created: {{ formatDate(ticket.createdAt) }}</div>
            </div>
            <div class="card-actions">
              <button @click="handleEdit(ticket)" class="btn btn-edit">
                <i class="fa-solid fa-pen"></i> Edit
              </button>
              <button @click="handleDelete(ticket)" class="btn btn-delete">
                <i class="fa-solid fa-trash"></i> Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- CREATE/EDIT VIEW -->
      <div v-else class="view-section active">
        <div class="list-header">
          <h2>{{ view === 'create' ? 'Create New Ticket' : 'Edit Ticket' }}</h2>
          <button @click="view = 'list'" class="btn btn-secondary-outline">
            <i class="fa-solid fa-arrow-left"></i> Back to List
          </button>
        </div>
        
        <div class="card-box" style="max-width: 800px; margin: 0 auto">
          <form class="auth-form" @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="title">Title *</label>
              <input type="text" id="title" v-model="formData.title" placeholder="Enter ticket title" />
              <div v-if="errors.title" class="error-message">{{ errors.title }}</div>
            </div>
            
            <div class="form-group">
              <label for="description">Description</label>
              <textarea id="description" v-model="formData.description" placeholder="Enter ticket description (optional)"></textarea>
              <div v-if="errors.description" class="error-message">{{ errors.description }}</div>
            </div>
            
            <div class="form-group">
              <label for="status">Status *</label>
              <select id="status" v-model="formData.status">
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
              <div v-if="errors.status" class="error-message">{{ errors.status }}</div>
            </div>
            
            <div class="form-group">
              <label for="priority">Priority</label>
              <select id="priority" v-model="formData.priority">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            
            <div style="display: flex; gap: 1rem; margin-top: 2rem">
              <button type="submit" class="btn btn-primary" style="flex: 1">
                {{ view === 'create' ? 'Create Ticket' : 'Update Ticket' }}
              </button>
              <button type="button" @click="view = 'list'" class="btn btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      </div>
      
      <div class="decorative-circle bottom-left"></div>
    </main>
    
    <Footer />
  </div>
</template>

<script>
import { getTickets, createTicket, updateTicket, deleteTicket, validateTicket } from '../utils/helpers'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Toast from '../components/Toast.vue'

export default {
  name: 'Tickets',
  components: { Header, Footer, Toast },
  data() {
    return {
      tickets: [],
      view: 'list',
      currentTicket: null,
      formData: { title: '', description: '', status: 'open', priority: 'medium' },
      errors: {},
      toast: null,
      deleteModal: null
    }
  },
  mounted() {
    this.loadTickets()
  },
  methods: {
    loadTickets() {
      this.tickets = getTickets()
    },
    handleCreateNew() {
      this.formData = { title: '', description: '', status: 'open', priority: 'medium' }
      this.currentTicket = null
      this.errors = {}
      this.view = 'create'
    },
    handleEdit(ticket) {
      this.currentTicket = ticket
      this.formData = {
        title: ticket.title,
        description: ticket.description || '',
        status: ticket.status,
        priority: ticket.priority || 'medium'
      }
      this.errors = {}
      this.view = 'edit'
    },
    handleSubmit() {
      const validation = validateTicket(this.formData)
      if (!validation.isValid) {
        this.errors = validation.errors
        return
      }
      
      let result
      if (this.view === 'create') {
        result = createTicket(this.formData)
        this.toast = { message: 'Ticket created successfully!', type: 'success' }
      } else {
        result = updateTicket(this.currentTicket.id, this.formData)
        this.toast = { message: 'Ticket updated successfully!', type: 'success' }
      }
      
      if (result.success) {
        this.loadTickets()
        this.view = 'list'
        this.formData = { title: '', description: '', status: 'open', priority: 'medium' }
      }
    },
    handleDelete(ticket) {
      this.deleteModal = ticket
    },
    confirmDelete() {
      if (this.deleteModal) {
        const result = deleteTicket(this.deleteModal.id)
        if (result.success) {
          this.toast = { message: 'Ticket deleted successfully!', type: 'success' }
          this.loadTickets()
        }
        this.deleteModal = null
      }
    },
    getStatusLabel(status) {
      const labels = { open: 'Open', in_progress: 'In Progress', closed: 'Closed' }
      return labels[status] || status
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString()
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
