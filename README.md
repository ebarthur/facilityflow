# FacilityFlow - Modern University Facility Booking System

A comprehensive university facility booking system with a **stunning modern UI** built with MVC architecture using Node.js, Express, and PostgreSQL. FacilityFlow provides seamless facility management and booking capabilities for educational institutions with a premium, app-like user experience.

##  Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd facilityflow

# Install dependencies
npm install

# Setup database
node database/setup.js

# Start the server
npm run dev
```

Visit `http://localhost:3000` to see the application!

**Choose Your Version:**
- `/index.html` - Public version (no authentication)
- `/index-with-auth.html` - Full version with login and admin features

##  Features

###  Modern UI Design
- **Stunning Visual Design**: Premium gradient-based interface with glassmorphism effects
- **Dark Mode Auth Pages**: Beautiful animated login/registration with floating particles
- **Smooth Animations**: Micro-interactions, hover effects, and page transitions
- **Gradient Elements**: Modern color schemes with purple, blue, and teal gradients
- **Responsive Design**: Mobile-first approach with adaptive layouts

###  Facility Management
- **Interactive Cards**: 3D hover effects with gradient top borders
- **Real-time Availability**: Live slot checking with visual feedback
- **Admin Controls**: Inline edit/delete for authorized users
- **Smart Filtering**: Search and filter facilities by capacity and location

###  Booking System
- **Visual Time Slots**: Pill-shaped slots with gradient selected states
- **Status Indicators**: Color-coded booking statuses with gradient badges
- **User Dashboard**: Comprehensive booking history with statistics
- **Quick Actions**: One-click booking management

### 🔐 Authentication (index-with-auth.html)
- **Modern Login/Register**: Toggle-style tabs with shine animations
- **Role-Based Access**: Admin and user role differentiation
- **Secure Sessions**: localStorage-based session management
- **Admin Portal**: Dedicated dashboard for facility and booking management

###  RESTful API
- Complete CRUD operations with validation
- Booking conflict detection
- Comprehensive error handling

## Technology Stack

### Backend
- **Node.js** - Runtime environment 
- **Express.js** - Web framework 
- **PostgreSQL** - Database 
- **Express Validator** - Input validation
- **Moment.js** - Date/time handling  


### Frontend
- **HTML5/CSS3/JavaScript** - Core technologies
- **Bootstrap 5** - UI framework with custom gradient overrides
- **Font Awesome 6** - Modern icon set
- **Custom CSS** - Extensive custom styling with:
  - CSS Variables for theming
  - Glassmorphism effects
  - Gradient animations
  - Micro-interactions
  - Responsive breakpoints

## Project Structure

```
miniproject/
├── config/
│   └── database.js          # Database configuration
├── controllers/
│   ├── facilityController.js # Facility logic
│   └── bookingController.js  # Booking logic
├── database/
│   ├── schema.sql           # Database schema
│   └── setup.js             # Database setup script
├── middleware/
│   └── validation.js        # Input validation middleware
├── models/
│   ├── Facility.js         # Facility model
│   ├── User.js            # User model
│   └── Booking.js          # Booking model
├── public/
│   ├── index.html              # Modern UI (public version)
│   ├── index-with-auth.html    # Modern UI with authentication
│   ├── app.js                  # Frontend JavaScript (public)
│   └── app-with-auth.js        # Frontend JavaScript (with auth)
├── routes/
│   ├── facilities.js      # Facility routes
│   └── bookings.js        # Booking routes
├── .env                   # Environment variables
├── package.json           # Dependencies
├── server.js              # Main server file
└── README.md              # This file
```

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Database Setup

1. **Create Database**
   ```sql
   CREATE DATABASE campus_booking;
   ```

2. **Configure Environment**
   Copy `.env` file and update database credentials:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=campus_booking
   DB_USER=postgres
   DB_PASSWORD=your_password
   ```

3. **Setup Database Schema**
   ```bash
   node database/setup.js
   ```

### Application Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Start Production Server**
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

##  UI Design System

### Color Palette
FacilityFlow features a modern gradient-based color system:

**Primary Gradients:**
- **Purple Primary**: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- **Cyan Success**: `linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)`
- **Pink Secondary**: `linear-gradient(135deg, #f093fb 0%, #f5576c 100%)`
- **Yellow Warning**: `linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)`
- **Teal Green**: `linear-gradient(135deg, #11998e 0%, #38ef7d 100%)`

**Background:**
- **Light Mode**: `linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)`
- **Dark Auth**: `linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)`

### Design Elements

**Cards:**
- 20px border radius for modern rounded corners
- Three-tier shadow system (light/medium/heavy)
- Glassmorphism with backdrop blur on auth pages
- 3D hover effects with translateY and scale transforms

**Buttons:**
- Gradient backgrounds with matching shadows
- Shine sweep animation on hover
- 12px border radius
- Letter-spacing for professional typography

**Forms:**
- Icon-prefixed labels
- Lift effect on focus (translateY -1px)
- Gradient glow shadows
- Helpful placeholder text

**Animations:**
- Floating particles (auth page)
- Moving grid background
- Pulsing gradient orb
- Card entrance animations
- Shimmer effects on logo

### Typography
- **Font Family**: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto
- **Headers**: 800 weight with gradient text fill
- **Body**: 400-600 weight range
- **Letter Spacing**: Negative for headers, positive for buttons

### Two Versions Available

**1. Public Version** (`index.html`)
- Clean, minimal navigation
- Browse facilities and create bookings
- Email-based booking lookup
- No authentication required

**2. Authenticated Version** (`index-with-auth.html`)
- Stunning dark login/register page with animations
- User and Admin dashboards
- Role-based access control
- Admin facility management
- Booking approval system
- Comprehensive statistics

## API Endpoints

### Facilities
- `GET /api/facilities` - Get all facilities
- `GET /api/facilities/:id` - Get specific facility
- `POST /api/facilities` - Create facility (admin)
- `PUT /api/facilities/:id` - Update facility (admin)
- `DELETE /api/facilities/:id` - Delete facility (admin)

### Bookings
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/:id` - Get specific booking
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking
- `GET /api/bookings/availability/check` - Check availability
- `GET /api/bookings/user/history` - Get user bookings

### System
- `GET /` - API information
- `GET /api/health` - Health check

## Database Schema

### Users
- `id` (SERIAL PRIMARY KEY)
- `name` (VARCHAR(100))
- `email` (VARCHAR(100) UNIQUE)
- `role` (VARCHAR(20) - user/admin)
- `created_at` (TIMESTAMP)

### Facilities
- `id` (SERIAL PRIMARY KEY)
- `name` (VARCHAR(100))
- `location` (VARCHAR(200))
- `capacity` (INTEGER)
- `created_at` (TIMESTAMP)

### Bookings
- `id` (SERIAL PRIMARY KEY)
- `facility_id` (INTEGER REFERENCES facilities)
- `user_id` (INTEGER REFERENCES users)
- `date` (DATE)
- `start_time` (TIME)
- `end_time` (TIME)
- `status` (VARCHAR(20) - confirmed/cancelled/pending)
- `created_at` (TIMESTAMP)

## 📱 Usage

### Public Version (index.html)

**For All Users:**
1. **Browse Facilities**: View all available facilities with gradient cards
2. **Select Facility**: Click on any facility card to see details
3. **Choose Time**: Pick a date and click on an available time slot (turns gradient purple when selected)
4. **Enter Details**: Fill in your name and email
5. **Confirm Booking**: Click the "Confirm Booking" button
6. **View Bookings**: Navigate to "My Bookings" and search by email

### Authenticated Version (index-with-auth.html)

**Login/Registration:**
- Beautiful dark-themed auth page with floating particles
- Toggle between "Sign In" and "Sign Up" tabs
- Check "Login/Register as Administrator" for admin access
- Automatic login after successful registration

**For Regular Users:**
1. **Dashboard**: View statistics and recent bookings at a glance
2. **Browse Facilities**: Explore facilities with modern card design
3. **Book Slots**: Interactive time slot selection with visual feedback
4. **My Bookings**: Manage all your reservations with color-coded statuses
5. **Cancel Bookings**: One-click cancellation for confirmed bookings

**For Administrators:**
1. **Admin Dashboard**:
   - View total facilities, bookings, and pending approvals
   - Quick action buttons for management tasks
   - Statistics cards with gradient backgrounds

2. **Facility Management**:
   - Create new facilities with inline form
   - Edit existing facilities
   - Delete facilities (with confirmation)
   - Search and filter capabilities

3. **Booking Approval Portal**:
   - Review pending booking requests
   - Approve or reject bookings
   - Filter by date and status
   - View approval history

4. **All Bookings Management**:
   - Monitor all system bookings
   - Edit booking details
   - Cancel bookings if needed
   - Advanced filtering options

## Features Implemented

###  Task 1: Database Setup
- PostgreSQL database with required tables
- Proper relationships and constraints
- Sample data insertion
- Database setup script

### Task 2: MVC Backend
- RESTful API with all required endpoints
- Input validation and error handling
- Booking conflict detection
- Proper HTTP status codes
- MVC architecture implementation

###  Task 3: Frontend Development
- **Premium Modern UI** with custom gradient design system
- **Two Complete Versions**: Public and authenticated interfaces
- **Stunning Authentication Pages**: Dark theme with particles and animations
- **Interactive Components**: 3D cards, animated buttons, gradient badges
- **Real-time Availability**: Visual time slot selection
- **Responsive Design**: Mobile-first with smooth transitions
- **Admin Portal**: Comprehensive management dashboard
- **Seamless Integration**: Frontend-backend API integration

###  UI Enhancements
- **Glassmorphism Effects**: Frosted glass cards with backdrop blur
- **Gradient System**: Multi-color gradient theme throughout
- **Micro-interactions**: Hover effects, lift animations, shine sweeps
- **Custom Animations**: Floating particles, moving grids, pulsing orbs
- **Modern Typography**: Inter font with gradient text fills
- **Visual Feedback**: Color-coded statuses, loading states, empty states
- **Accessibility**: Proper focus states, semantic HTML, ARIA labels

## Error Handling

The application includes comprehensive error handling:
- Database connection errors
- Validation errors with detailed messages
- Booking conflict detection
- Network error handling
- User-friendly error messages

## Security Features

- Input validation and sanitization
- SQL injection prevention (parameterized queries)
- CORS configuration
- Error message sanitization in production

## Development Notes

- Uses MVC pattern for clean separation of concerns
- Follows RESTful API conventions
- Implements proper HTTP status codes
- Includes comprehensive validation
- Responsive design for mobile compatibility

##  Key Highlights

### What Makes FacilityFlow Special

1. **Premium Design**: Looks and feels like a high-end SaaS product
2. **Dual Versions**: Choose between public access or full authentication
3. **Admin Features**: Complete facility and booking management
4. **Visual Excellence**: Gradient-based design with smooth animations
5. **User Experience**: Intuitive, responsive, and delightful to use
6. **Production Ready**: Clean code, proper error handling, comprehensive validation

### UI/UX Features

-  **Gradient-based color system** with CSS variables
-  **Glassmorphism effects** on auth pages
-  **3D card transforms** with hover states
-  **Animated particles** on login page
-  **Smooth page transitions** between sections
-  **Visual time slot selection** with gradient feedback
-  **Status badges** with matching gradients
-  **Empty states** with helpful CTAs
-  **Loading states** with custom spinners
-  **Responsive design** across all devices

##  Future Enhancements

- JWT-based authentication with refresh tokens
- Email notifications for bookings and approvals
- Calendar integration (Google Calendar, Outlook)
- Advanced analytics dashboard with charts
- Real-time updates with WebSockets
- Mobile app development (React Native)
- Dark mode toggle for main application
- Multi-language support
- PDF export for booking confirmations
- QR code generation for bookings

##  Screenshots

### Modern Authentication Page
- Dark gradient background with animated grid
- Floating particles animation
- Glassmorphism card design
- Toggle-style tab navigation
- Icon-prefixed form fields
- Shine animation on buttons

### Facility Browsing
- Gradient facility cards with 3D hover effects
- Color-coded availability badges
- Location and capacity icons
- Smooth card animations

### Time Slot Selection
- Interactive pill-shaped slots
- Gradient selected state
- Visual feedback on hover
- Disabled state for booked slots

### Booking Management
- Color-coded status badges (Confirmed, Pending, Cancelled)
- Gradient border indicators
- One-click cancellation
- Comprehensive booking details

### Admin Dashboard
- Statistics cards with gradients
- Quick action buttons
- Recent bookings widget
- Role-based navigation

## 🛠️ Technical Details

### CSS Architecture
- **CSS Variables** for theming and consistency
- **BEM-like naming** for component classes
- **Mobile-first** responsive design
- **Performance optimized** with transform and opacity animations
- **Accessibility focused** with proper focus states

### JavaScript Features
- **Async/Await** for API calls
- **Dynamic DOM** rendering with template literals
- **Event delegation** for efficient event handling
- **Error handling** with user-friendly messages
- **Local storage** for session management (auth version)

### Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

##  License

MIT License - feel free to use this project for learning and development purposes.

##  Acknowledgments

Built with modern web technologies and inspired by contemporary SaaS design patterns. Special attention paid to user experience, visual design, and code quality.

---

**FacilityFlow** - Modern facility booking made beautiful 
