// Dashboard JavaScript for Static UI
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is authenticated
    const session = JSON.parse(localStorage.getItem('ticketapp_session'));
    if (!session) {
        window.location.href = 'auth.html';
        return;
    }

    // Update welcome message with user name
    const heading = document.querySelector('.dashboard-content h1');
    if (heading && session.name) {
        heading.textContent = `Welcome to Your Dashboard, ${session.name}`;
    }

    // Get ticket statistics
    function getTicketStats() {
        const tickets = JSON.parse(localStorage.getItem('ticketapp_tickets')) || [];
        return {
            total: tickets.length,
            open: tickets.filter(t => t.status === 'open').length,
            in_progress: tickets.filter(t => t.status === 'in_progress').length,
            closed: tickets.filter(t => t.status === 'closed').length
        };
    }

    // Update stat cards
    const stats = getTicketStats();
    
    const totalValue = document.querySelector('[data-testid="total-tickets-value"]');
    const openValue = document.querySelector('[data-testid="open-tickets-value"]');
    const progressValue = document.querySelector('[data-testid="in-progress-tickets-value"]');
    const closedValue = document.querySelector('[data-testid="resolved-tickets-value"]');

    if (totalValue) totalValue.textContent = stats.total;
    if (openValue) openValue.textContent = stats.open;
    if (progressValue) progressValue.textContent = stats.in_progress;
    if (closedValue) closedValue.textContent = stats.closed;

    // Handle logout
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            localStorage.removeItem('ticketapp_session');
            window.location.href = 'index.html';
        });
    }
});
