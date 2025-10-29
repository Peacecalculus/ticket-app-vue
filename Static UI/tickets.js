// Tickets Management JavaScript for Static UI
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    const session = JSON.parse(localStorage.getItem('ticketapp_session'));
    if (!session) {
        window.location.href = 'auth.html';
        return;
    }

    // Get DOM elements
    const ticketsContainer = document.getElementById('tickets-container');
    const ticketForm = document.getElementById('ticket-form');
    const listView = document.getElementById('ticket-list-view');
    const formView = document.getElementById('ticket-form-view');
    const createTicketBtn = document.getElementById('create-ticket-btn');
    const backToListBtn = document.getElementById('back-to-list-btn');
    const logoutButton = document.getElementById('logout-button');
    const toastNotification = document.getElementById('toast-notification');
    const deleteModal = document.getElementById('delete-modal');
    const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    const cancelDeleteBtn = document.getElementById('cancel-delete-btn');
    const formTitle = document.getElementById('form-title');
    const ticketIdInput = document.getElementById('ticket-id');
    const noTicketsMessage = document.getElementById('no-tickets-message');

    let currentTicketId = null;
    let ticketToDelete = null;

    // Get tickets from localStorage
    function getTickets() {
        return JSON.parse(localStorage.getItem('ticketapp_tickets')) || [];
    }

    // Save tickets to localStorage
    function saveTickets(tickets) {
        localStorage.setItem('ticketapp_tickets', JSON.stringify(tickets));
    }

    // Show toast notification
    function showToast(message, isError = false) {
        toastNotification.textContent = message;
        toastNotification.classList.remove('error');
        if (isError) {
            toastNotification.classList.add('error');
        }
        toastNotification.classList.add('show');
        
        setTimeout(() => {
            toastNotification.classList.remove('show');
        }, 3000);
    }

    // Clear form errors
    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    }

    // Validate ticket form
    function validateTicket(data) {
        const errors = {};
        
        if (!data.title || data.title.trim().length === 0) {
            errors.title = 'Title is required';
        }
        
        if (!data.status) {
            errors.status = 'Status is required';
        } else if (!['open', 'in_progress', 'closed'].includes(data.status)) {
            errors.status = 'Status must be: open, in_progress, or closed';
        }
        
        if (data.description && data.description.length > 500) {
            errors.description = 'Description must be less than 500 characters';
        }
        
        return errors;
    }

    // Display validation errors
    function displayErrors(errors) {
        Object.keys(errors).forEach(field => {
            const errorEl = document.getElementById(`${field}-error`);
            if (errorEl) {
                errorEl.textContent = errors[field];
            }
        });
    }

    // Get status label
    function getStatusLabel(status) {
        const labels = {
            open: 'Open',
            in_progress: 'In Progress',
            closed: 'Closed'
        };
        return labels[status] || status;
    }

    // Format date
    function formatDate(dateString) {
        return new Date(dateString).toLocaleDateString();
    }

    // Render tickets list
    function renderTickets() {
        const tickets = getTickets();
        
        if (tickets.length === 0) {
            noTicketsMessage.style.display = 'block';
            // Remove any existing ticket cards
            const existingCards = ticketsContainer.querySelectorAll('.ticket-card');
            existingCards.forEach(card => card.remove());
            return;
        }

        noTicketsMessage.style.display = 'none';
        
        // Clear container except the no-tickets message
        const existingCards = ticketsContainer.querySelectorAll('.ticket-card');
        existingCards.forEach(card => card.remove());

        tickets.forEach(ticket => {
            const ticketCard = document.createElement('div');
            ticketCard.className = `ticket-card status-${ticket.status}`;
            ticketCard.setAttribute('data-testid', `ticket-card-${ticket.id}`);
            
            ticketCard.innerHTML = `
                <div class="ticket-status-tag" data-testid="status-tag">${getStatusLabel(ticket.status)}</div>
                <h3 class="ticket-title" data-testid="ticket-title">${ticket.title}</h3>
                <p class="ticket-description">${ticket.description || 'No description provided'}</p>
                <div class="ticket-meta">
                    <span>Priority: ${ticket.priority || 'medium'}</span> | 
                    <span>ID: TKT-${ticket.id.slice(-3)}</span>
                </div>
                <div class="card-actions">
                    <button class="btn btn-edit" data-ticket-id="${ticket.id}" data-testid="edit-button">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button class="btn btn-delete" data-ticket-id="${ticket.id}" data-testid="delete-button">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            `;
            
            ticketsContainer.appendChild(ticketCard);
        });
        
        // Add event listeners to edit and delete buttons
        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', function() {
                const ticketId = this.getAttribute('data-ticket-id');
                editTicket(ticketId);
            });
        });
        
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', function() {
                const ticketId = this.getAttribute('data-ticket-id');
                showDeleteModal(ticketId);
            });
        });
    }

    // Show create view
    createTicketBtn.addEventListener('click', function() {
        currentTicketId = null;
        formTitle.textContent = 'Create New Ticket';
        ticketForm.reset();
        ticketIdInput.value = '';
        clearErrors();
        listView.classList.remove('active');
        formView.classList.remove('hidden');
        formView.classList.add('active');
    });

    // Back to list
    backToListBtn.addEventListener('click', function() {
        formView.classList.remove('active');
        formView.classList.add('hidden');
        listView.classList.add('active');
    });

    // Handle form submit (create or update)
    ticketForm.addEventListener('submit', function(e) {
        e.preventDefault();
        clearErrors();

        const formData = {
            title: document.getElementById('title').value.trim(),
            description: document.getElementById('description').value.trim(),
            status: document.getElementById('status').value,
            priority: document.getElementById('priority').value
        };

        const errors = validateTicket(formData);
        if (Object.keys(errors).length > 0) {
            displayErrors(errors);
            return;
        }

        const tickets = getTickets();
        
        if (currentTicketId) {
            // Update existing ticket
            const index = tickets.findIndex(t => t.id === currentTicketId);
            if (index !== -1) {
                tickets[index] = {
                    ...tickets[index],
                    ...formData,
                    updatedAt: new Date().toISOString()
                };
                saveTickets(tickets);
                showToast('Ticket updated successfully!');
            }
        } else {
            // Create new ticket
            const newTicket = {
                id: Date.now().toString(),
                ...formData,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            tickets.push(newTicket);
            saveTickets(tickets);
            showToast('Ticket created successfully!');
        }

        formView.classList.remove('active');
        formView.classList.add('hidden');
        listView.classList.add('active');
        renderTickets();
    });

    // Edit ticket function
    function editTicket(id) {
        const tickets = getTickets();
        const ticket = tickets.find(t => t.id === id);
        if (!ticket) return;

        currentTicketId = id;
        formTitle.textContent = 'Edit Ticket';
        document.getElementById('ticket-id').value = ticket.id;
        document.getElementById('title').value = ticket.title;
        document.getElementById('description').value = ticket.description || '';
        document.getElementById('status').value = ticket.status;
        document.getElementById('priority').value = ticket.priority || 'medium';

        listView.classList.remove('active');
        formView.classList.remove('hidden');
        formView.classList.add('active');
        clearErrors();
    }

    // Show delete modal
    function showDeleteModal(id) {
        const tickets = getTickets();
        const ticket = tickets.find(t => t.id === id);
        if (!ticket) return;

        ticketToDelete = id;
        document.getElementById('ticket-to-delete-id').textContent = `TKT-${id.slice(-3)}`;
        deleteModal.classList.remove('hidden');
    }

    // Confirm delete
    confirmDeleteBtn.addEventListener('click', function() {
        if (ticketToDelete) {
            const tickets = getTickets();
            const filtered = tickets.filter(t => t.id !== ticketToDelete);
            saveTickets(filtered);
            
            showToast('Ticket deleted successfully!');
            deleteModal.classList.add('hidden');
            ticketToDelete = null;
            renderTickets();
        }
    });

    // Cancel delete
    cancelDeleteBtn.addEventListener('click', function() {
        deleteModal.classList.add('hidden');
        ticketToDelete = null;
    });

    // Handle logout
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            localStorage.removeItem('ticketapp_session');
            window.location.href = 'index.html';
        });
    }

    // Initial render
    renderTickets();
});
