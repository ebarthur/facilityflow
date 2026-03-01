const API_BASE = '/api';

let currentFacility = null;
let selectedTimeSlot = null;
let currentUser = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('booking-date').min = today;
    document.getElementById('booking-date').value = today;
    
    // Load facilities
    loadFacilities();
});

// Show different sections
function showSection(section) {
    const sections = ['facilities', 'booking', 'bookings'];
    sections.forEach(s => {
        const element = document.getElementById(`${s}-section`);
        if (element) {
            element.style.display = s === section ? 'block' : 'none';
        }
    });
}

// Load all facilities
async function loadFacilities() {
    try {
        const response = await fetch(`${API_BASE}/facilities`);
        const result = await response.json();
        
        if (result.success) {
            displayFacilities(result.data);
        } else {
            showAlert('Error loading facilities', 'danger');
        }
    } catch (error) {
        showAlert('Network error loading facilities', 'danger');
        console.error('Error:', error);
    }
}

// Display facilities in cards
function displayFacilities(facilities) {
    const container = document.getElementById('facilities-list');

    if (facilities.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-building-slash fa-3x text-muted mb-3"></i>
                <p class="text-muted">No facilities available at the moment</p>
            </div>`;
        return;
    }

    container.innerHTML = facilities.map(facility => `
        <div class="col-md-6 col-lg-4">
            <div class="card facility-card h-100" onclick="selectFacility(${facility.id})">
                <div class="card-body p-4">
                    <div class="mb-3">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <h5 class="card-title mb-0 fw-bold">${facility.name}</h5>
                            <span class="badge" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
                                <i class="fas fa-check-circle"></i> Available
                            </span>
                        </div>
                    </div>
                    <div class="mb-4">
                        <p class="card-text mb-2">
                            <i class="fas fa-map-marker-alt" style="color: #667eea;"></i>
                            <span class="text-muted">${facility.location}</span>
                        </p>
                        <p class="card-text mb-0">
                            <i class="fas fa-users" style="color: #764ba2;"></i>
                            <span class="text-muted">Capacity: <strong>${facility.capacity}</strong> people</span>
                        </p>
                    </div>
                    <button class="btn btn-outline-primary w-100 mt-auto" onclick="event.stopPropagation(); selectFacility(${facility.id})">
                        <i class="fas fa-calendar-plus"></i> Book This Facility
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Select a facility for booking
async function selectFacility(facilityId) {
    try {
        const response = await fetch(`${API_BASE}/facilities/${facilityId}`);
        const result = await response.json();
        
        if (result.success) {
            currentFacility = result.data;
            showSection('booking');
            displayFacilityDetails(currentFacility);
            document.getElementById('facility-name').textContent = `Book ${currentFacility.name}`;
            loadAvailability();
        } else {
            showAlert('Error loading facility details', 'danger');
        }
    } catch (error) {
        showAlert('Network error loading facility', 'danger');
        console.error('Error:', error);
    }
}

// Display facility details
function displayFacilityDetails(facility) {
    const container = document.getElementById('facility-details');
    container.innerHTML = `
        <div class="mb-4 pb-3 border-bottom">
            <h5 class="mb-3 fw-bold">${facility.name}</h5>
            <div class="mb-2">
                <i class="fas fa-map-marker-alt me-2" style="color: #667eea;"></i>
                <strong class="text-muted">Location:</strong>
                <p class="mb-0 ms-4">${facility.location}</p>
            </div>
        </div>
        <div class="mb-4 pb-3 border-bottom">
            <i class="fas fa-users me-2" style="color: #764ba2;"></i>
            <strong class="text-muted">Capacity:</strong>
            <p class="mb-0 ms-4">${facility.capacity} people</p>
        </div>
        <div class="mb-3">
            <i class="fas fa-id-badge me-2" style="color: #4facfe;"></i>
            <strong class="text-muted">ID:</strong>
            <span class="badge bg-light text-dark ms-2">#${facility.id}</span>
        </div>
        <div class="alert" style="background: linear-gradient(135deg, #f8f9ff 0%, #eef1ff 100%); border: none; border-radius: 12px;">
            <small>
                <i class="fas fa-lightbulb" style="color: #667eea;"></i>
                Select a date and time slot to proceed with your booking
            </small>
        </div>
    `;
}

// Load availability for selected facility and date
async function loadAvailability() {
    if (!currentFacility) return;
    
    const date = document.getElementById('booking-date').value;
    if (!date) return;
    
    try {
        const response = await fetch(`${API_BASE}/bookings/availability/check?facility_id=${currentFacility.id}&date=${date}`);
        const result = await response.json();
        
        if (result.success) {
            displayTimeSlots(result.data.available_slots);
        } else {
            showAlert('Error loading availability', 'danger');
        }
    } catch (error) {
        showAlert('Network error loading availability', 'danger');
        console.error('Error:', error);
    }
}

// Display available time slots
function displayTimeSlots(slots) {
    const container = document.getElementById('time-slots');

    if (slots.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-4">
                <i class="fas fa-calendar-times fa-2x text-muted mb-2"></i>
                <p class="text-muted mb-0">No available slots for this date</p>
            </div>`;
        return;
    }

    container.innerHTML = slots.map(slot => `
        <div class="col-md-6 col-lg-4">
            <div class="time-slot" onclick="selectTimeSlot('${slot.start_time}', '${slot.end_time}', this)">
                <div>
                    <i class="fas fa-clock me-2"></i>
                    <span>${slot.start_time} - ${slot.end_time}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Select a time slot
function selectTimeSlot(startTime, endTime, element) {
    // Remove previous selection
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('selected');
    });
    
    // Add selection to clicked slot
    element.classList.add('selected');
    selectedTimeSlot = { start_time: startTime, end_time: endTime };
    
    // Enable booking button if user info is filled
    checkBookingForm();
}

// Check if booking form is complete
function checkBookingForm() {
    const userName = document.getElementById('user-name').value.trim();
    const userEmail = document.getElementById('user-email').value.trim();
    const createBtn = document.getElementById('create-booking-btn');
    
    if (userName && userEmail && selectedTimeSlot && currentFacility) {
        createBtn.disabled = false;
    } else {
        createBtn.disabled = true;
    }
}

// Create a new booking
async function createBooking() {
    const userName = document.getElementById('user-name').value.trim();
    const userEmail = document.getElementById('user-email').value.trim();
    const date = document.getElementById('booking-date').value;
    
    if (!userName || !userEmail || !selectedTimeSlot || !currentFacility || !date) {
        showAlert('Please fill all required fields', 'warning');
        return;
    }
    
    const bookingData = {
        facility_id: currentFacility.id,
        user_id: 1, // Using default user ID for demo
        date: date,
        start_time: selectedTimeSlot.start_time,
        end_time: selectedTimeSlot.end_time,
        status: 'confirmed'
    };
    
    try {
        const response = await fetch(`${API_BASE}/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showAlert('Booking created successfully!', 'success');
            // Reset form
            document.getElementById('user-name').value = '';
            document.getElementById('user-email').value = '';
            selectedTimeSlot = null;
            document.querySelectorAll('.time-slot').forEach(slot => {
                slot.classList.remove('selected');
            });
            document.getElementById('create-booking-btn').disabled = true;
            // Reload availability
            loadAvailability();
        } else {
            showAlert(result.message || 'Error creating booking', 'danger');
        }
    } catch (error) {
        showAlert('Network error creating booking', 'danger');
        console.error('Error:', error);
    }
}

// Load user bookings
async function loadUserBookings() {
    const userEmail = document.getElementById('user-email-bookings').value.trim();
    
    if (!userEmail) {
        showAlert('Please enter your email', 'warning');
        return;
    }
    
    // For demo purposes, we'll use a fixed user ID
    // In a real app, you'd authenticate the user first
    const userId = 1;
    
    try {
        const response = await fetch(`${API_BASE}/bookings/user/history?user_id=${userId}`);
        const result = await response.json();
        
        if (result.success) {
            displayUserBookings(result.data);
        } else {
            showAlert('Error loading bookings', 'danger');
        }
    } catch (error) {
        showAlert('Network error loading bookings', 'danger');
        console.error('Error:', error);
    }
}

// Display user bookings
function displayUserBookings(bookings) {
    const container = document.getElementById('user-bookings-list');

    if (bookings.length === 0) {
        container.innerHTML = `
            <div class="text-center py-5">
                <div class="mb-4">
                    <i class="fas fa-calendar-times" style="font-size: 4rem; color: #ddd;"></i>
                </div>
                <h4 class="text-muted mb-3">No Bookings Found</h4>
                <p class="text-muted mb-4">You haven't made any reservations yet</p>
                <button class="btn btn-primary btn-lg" onclick="showSection('facilities')">
                    <i class="fas fa-search"></i> Browse Facilities
                </button>
            </div>`;
        return;
    }

    container.innerHTML = bookings.map(booking => {
        const statusColors = {
            'confirmed': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'cancelled': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'pending': 'linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)'
        };
        const statusIcons = {
            'confirmed': 'fa-check-circle',
            'cancelled': 'fa-times-circle',
            'pending': 'fa-clock'
        };
        const statusColor = statusColors[booking.status] || statusColors['pending'];
        const statusIcon = statusIcons[booking.status] || statusIcons['pending'];

        return `
        <div class="card booking-card mb-3 ${booking.status === 'cancelled' ? 'cancelled' : ''}" style="border-left: 5px solid transparent; border-image: ${statusColor} 1;">
            <div class="card-body p-4">
                <div class="row align-items-center">
                    <div class="col-md-7">
                        <h5 class="card-title mb-3 fw-bold">
                            <i class="fas fa-building" style="color: #667eea;"></i> ${booking.facility_name}
                        </h5>
                        <div class="mb-2">
                            <i class="fas fa-calendar me-2 text-muted"></i>
                            <strong>Date:</strong> <span class="text-muted">${booking.date}</span>
                        </div>
                        <div>
                            <i class="fas fa-clock me-2 text-muted"></i>
                            <strong>Time:</strong> <span class="text-muted">${booking.start_time} - ${booking.end_time}</span>
                        </div>
                    </div>
                    <div class="col-md-5 text-end">
                        <div class="mb-3">
                            <span class="badge px-3 py-2" style="background: ${statusColor}; font-size: 0.9rem;">
                                <i class="fas ${statusIcon}"></i> ${booking.status.toUpperCase()}
                            </span>
                        </div>
                        ${booking.status === 'confirmed' ? `
                            <button class="btn btn-sm btn-outline-danger" onclick="cancelBooking(${booking.id})">
                                <i class="fas fa-times-circle"></i> Cancel Booking
                            </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>
    `}).join('');
}

// Cancel a booking
async function cancelBooking(bookingId) {
    if (!confirm('Are you sure you want to cancel this booking?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/bookings/${bookingId}`, {
            method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (result.success) {
            showAlert('Booking cancelled successfully', 'success');
            // Reload bookings
            loadUserBookings();
        } else {
            showAlert(result.message || 'Error cancelling booking', 'danger');
        }
    } catch (error) {
        showAlert('Network error cancelling booking', 'danger');
        console.error('Error:', error);
    }
}

// Show alert message
function showAlert(message, type) {
    const container = document.getElementById('alert-container');
    const alertId = 'alert-' + Date.now();

    const alertIcons = {
        'success': 'fa-check-circle',
        'danger': 'fa-exclamation-circle',
        'warning': 'fa-exclamation-triangle',
        'info': 'fa-info-circle'
    };

    const alertGradients = {
        'success': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'danger': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'warning': 'linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)',
        'info': 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    };

    const icon = alertIcons[type] || alertIcons['info'];
    const gradient = alertGradients[type] || alertGradients['info'];

    const alertHtml = `
        <div class="alert alert-${type} alert-dismissible fade show shadow-lg" role="alert" id="${alertId}"
             style="background: ${gradient}; color: white; border: none; border-radius: 15px; min-width: 300px;">
            <i class="fas ${icon} me-2"></i>
            <strong>${message}</strong>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert"></button>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', alertHtml);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        const alertElement = document.getElementById(alertId);
        if (alertElement) {
            const bsAlert = bootstrap.Alert.getOrCreateInstance(alertElement);
            bsAlert.close();
        }
    }, 5000);
}

// Event listeners
document.getElementById('booking-date').addEventListener('change', loadAvailability);
document.getElementById('user-name').addEventListener('input', checkBookingForm);
document.getElementById('user-email').addEventListener('input', checkBookingForm);
